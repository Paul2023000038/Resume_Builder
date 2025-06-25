import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, FileText, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
                <p className="text-xs text-gray-500">Professional Resume Creator</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Auto-saving</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{user?.email}</span>
              <span className="sm:hidden">Account</span>
            </div>
            
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;