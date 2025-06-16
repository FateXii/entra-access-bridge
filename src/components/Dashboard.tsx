
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { ProfileCompletionFlow } from '@/components/ProfileCompletionFlow';
import { CourseCatalog } from '@/components/CourseCatalog';
import { CourseDetails } from '@/components/CourseDetails';
import { TutoringSessions } from '@/components/TutoringSessions';
import { UserProfile } from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, User, GraduationCap, LogOut } from 'lucide-react';

type View = 'catalog' | 'course-details' | 'tutoring' | 'profile';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const { isProfileComplete, loading, refetch } = useProfileCompletion();
  const [currentView, setCurrentView] = useState<View>('catalog');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);

  useEffect(() => {
    if (!loading && !isProfileComplete) {
      setShowProfileCompletion(true);
    }
  }, [loading, isProfileComplete]);

  const handleProfileComplete = () => {
    setShowProfileCompletion(false);
    refetch();
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('course-details');
  };

  const handleBackToCatalog = () => {
    setCurrentView('catalog');
    setSelectedCourseId(null);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const renderContent = () => {
    switch (currentView) {
      case 'catalog':
        return <CourseCatalog onCourseSelect={handleCourseSelect} />;
      case 'course-details':
        return selectedCourseId ? (
          <CourseDetails courseId={selectedCourseId} onBack={handleBackToCatalog} />
        ) : (
          <CourseCatalog onCourseSelect={handleCourseSelect} />
        );
      case 'tutoring':
        return <TutoringSessions />;
      case 'profile':
        return <UserProfile />;
      default:
        return <CourseCatalog onCourseSelect={handleCourseSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileCompletionFlow 
        open={showProfileCompletion} 
        onComplete={handleProfileComplete} 
      />
      
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">EduPlatform</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <Button onClick={handleSignOut} variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-8">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setCurrentView('catalog')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'catalog' || currentView === 'course-details'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Course Catalog
            </button>
            <button
              onClick={() => setCurrentView('tutoring')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'tutoring'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Tutoring Sessions
            </button>
            <button
              onClick={() => setCurrentView('profile')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'profile'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </button>
          </div>
        </nav>

        <main>{renderContent()}</main>
      </div>
    </div>
  );
}
