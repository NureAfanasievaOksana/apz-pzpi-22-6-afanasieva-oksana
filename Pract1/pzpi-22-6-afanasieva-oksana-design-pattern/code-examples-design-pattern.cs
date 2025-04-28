//Відправник (Invoker)
public class TextEditor
{
    private Document _document;
    private Stack<ICommand> _undoStack = new Stack<ICommand>();

    public TextEditor()
    {
        _document = new Document();
    }

    public string GetText()
    {
        return _document.Text;
    }

    public void ExecuteCommand(ICommand command)
    {
        command.Execute();
        _undoStack.Push(command);
    }

    public void Undo()
    {
        if (_undoStack.Count > 0)
        {
            ICommand command = _undoStack.Pop();
            command.Undo();
        }
    }

    public Document GetDocument()
    {
        return _document;
    }
}

//Інтерфейс Command
public interface ICommand
{
    void Execute();
    void Undo();
}

//Конкретні команди (ConcreteCommand)
public class InsertTextCommand : ICommand
{
    private Document _document;
    private string _text;
    private int _i;
    private bool _executed;

    public InsertTextCommand(Document document, string text, int i)
    {
        _document = document;
        _text = text;
        _i = i;
        _executed = false;
    }

    public void Execute()
    {
        if (!_executed)
        {
            _document.Insert(_text, _i);
            _executed = true;
        }
    }

    public void Undo()
    {
        if (_executed)
        {
            _document.Delete(_i, _text.Length);
            _executed = false;
        }
    }
}

public class CopyCommand : ICommand
{
    private Document _document;
    private int _start;
    private int _length;

    public CopyCommand(Document document, int start, int length)
    {
        _document = document;
        _start = start;
        _length = length;
    }

    public void Execute()
    {
        _document.Copy(_start, _length);
    }

    public void Undo() { }
}

//Одержувач (Receiver)
public class Document
{
    private string _text = "";
    private List<string> _clipboard = new List<string>();

    public string Text => _text;

    public void Insert(string text, int i)
    {
        _text = _text.Insert(i, text);
        Console.WriteLine($"Text is pasted.\nCurrent text: {_text}");
    }

    public string Delete(int start, int length)
    {
        string deletedText = _text.Substring(start, length);
        _text = _text.Remove(start, length);
        Console.WriteLine($"Text deleted.\nCurrent text: {_text}");
        return deletedText;
    }

    public void Copy(int start, int length)
    {
        _clipboard.Add( _text.Substring(start, length));
        Console.WriteLine($"Text copied to clipboard: {_clipboard[_clipboard.Count - 1]}");
    }

    public string GetLastClipboardItem()
    {
        if( _clipboard.Count > 0 )
        {
            return _clipboard[_clipboard.Count - 1];
        }
        return "";
    }
}

//Клієнт (Client)
public class Client
{
    public static void Main(string[] args)
    {
        TextEditor editor = new TextEditor();

        ICommand insertCommand = new InsertTextCommand(editor.GetDocument(), "Some text.", 0);
        editor.ExecuteCommand(insertCommand);
        
        ICommand copyCommand = new CopyCommand(editor.GetDocument(), 0, 4);
        editor.ExecuteCommand(copyCommand);

        ICommand insertCommand1 = new InsertTextCommand(editor.GetDocument(), "text.", 10);
        editor.ExecuteCommand(insertCommand1);

        editor.Undo();
    }
}
