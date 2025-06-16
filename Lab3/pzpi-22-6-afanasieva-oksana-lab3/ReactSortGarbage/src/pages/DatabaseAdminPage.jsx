import { useState } from 'react';
import api from '../services/api';

const DatabaseAdminPage = () => {
  const [backupPath, setBackupPath] = useState('');
  const [restorePath, setRestorePath] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const cleanPath = (path) => {
    return path.replace(/^"+|"+$/g, '');
  };

  const handleSelectBackupFolder = async () => {
    try {
      const path = prompt('Enter backup directory path:');
      if (path) {
        setBackupPath(cleanPath(path));
      }
    } catch (error) {
      setMessage('Error selecting folder: ' + error.message);
    }
  };

  const handleSelectBackupFile = async () => {
    try {
      const path = prompt('Enter backup file path (.bak):');
      if (path) {
        setRestorePath(cleanPath(path));
      }
    } catch (error) {
      setMessage('Error selecting file: ' + error.message);
    }
  };

  const handleBackup = async () => {
    if (!backupPath) {
      setMessage('Please select backup folder first');
      return;
    }

    setIsLoading(true);
    setMessage('Creating backup...');
    
    try {
      const cleanedPath = cleanPath(backupPath);
      const response = await api.post('/database/backup', 
        `"${cleanedPath.replace(/\\/g, '\\\\')}"`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setMessage(response.data.message || 'Backup completed successfully');
    } catch (error) {
      const serverError = error.response?.data;
      let errorMessage = 'Backup failed';
      
      if (serverError?.errors) {
        errorMessage += ': ' + Object.values(serverError.errors).flat().join(', ');
      } else if (serverError?.title) {
        errorMessage += ': ' + serverError.title;
      } else {
        errorMessage += ': ' + error.message;
      }
      
      setMessage(errorMessage);
      console.error('Backup error details:', serverError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async () => {
    if (!restorePath) {
      setMessage('Please select backup file first');
      return;
    }

    if (!confirm('WARNING: This will overwrite all current data. Continue?')) {
      return;
    }

    setIsLoading(true);
    setMessage('Restoring database...');
    
    try {
      const cleanedPath = cleanPath(restorePath);
      const response = await api.post('/database/restore', 
        `"${cleanedPath.replace(/\\/g, '\\\\')}"`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setMessage(response.data.message || 'Restore completed successfully');
    } catch (error) {
      const serverError = error.response?.data;
      let errorMessage = 'Restore failed';
      
      if (serverError?.errors) {
        errorMessage += ': ' + Object.values(serverError.errors).flat().join(', ');
      } else if (serverError?.title) {
        errorMessage += ': ' + serverError.title;
      } else {
        errorMessage += ': ' + error.message;
      }
      
      setMessage(errorMessage);
      console.error('Restore error details:', serverError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <h1>Database Administration</h1>
      
      <div className="database-section">
        <div className="backup-section">
          <h2>Backup Database</h2>
          <div className="path-selector">
            <input
              type="text"
              value={backupPath}
              readOnly
              placeholder="No folder selected"
            />
            <button onClick={handleSelectBackupFolder}>
              Select Folder
            </button>
          </div>
          <button onClick={handleBackup} disabled={!backupPath || isLoading}>
            {isLoading ? 'Creating...' : 'Create Backup'}
          </button>
        </div>
        
        <div className="restore-section">
          <h2>Restore Database</h2>
          <div className="path-selector">
            <input
              type="text"
              value={restorePath}
              readOnly
              placeholder="No file selected"
            />
            <button onClick={handleSelectBackupFile}>
              Select .bak File
            </button>
          </div>
          <button onClick={handleRestore} disabled={!restorePath || isLoading}>
            {isLoading ? 'Restoring...' : 'Restore Database'}
          </button>
        </div>
      </div>
      
      {message && (
        <div className={`message ${message.includes('failed') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default DatabaseAdminPage;