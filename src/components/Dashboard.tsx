
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, GraduationCap, BookOpen, Users, Home, Calendar } from 'lucide-react';
import { CourseCatalog } from './CourseCatalog';
import { CourseDetails } from './CourseDetails';
import { TutoringSessions } from './TutoringSessions';
import { UserProfile } from './UserProfile';

type Page = 'home' | 'courses' | 'course-details' | 'tutoring' | 'profile';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');

  const handleSignOut = async () => {
    await signOut();
  };

  const renderNavigation = () => (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-blue-600">Minerva</h1>
            <div className="flex space-x-6">
              <Button
                variant={currentPage === 'home' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant={currentPage === 'courses' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('courses')}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Courses
              </Button>
              <Button
                variant={currentPage === 'tutoring' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('tutoring')}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Tutoring
              </Button>
              <Button
                variant={currentPage === 'profile' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('profile')}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Profile
              </Button>
            </div>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'courses':
        return <CourseCatalog />;
      case 'course-details':
        return (
          <CourseDetails
            courseId={selectedCourseId}
            onBack={() => setCurrentPage('courses')}
          />
        );
      case 'tutoring':
        return <TutoringSessions />;
      case 'profile':
        return <UserProfile />;
      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
              <p className="text-gray-600">Continue your learning journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('courses')}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                    Browse Courses
                  </CardTitle>
                  <CardDescription>Explore available courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">150+</p>
                  <p className="text-sm text-gray-600">Courses available</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('tutoring')}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="mr-2 h-5 w-5 text-green-600" />
                    Tutoring Sessions
                  </CardTitle>
                  <CardDescription>Book one-on-one sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">Book Now</p>
                  <p className="text-sm text-gray-600">Expert tutors available</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('profile')}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <User className="mr-2 h-5 w-5 text-purple-600" />
                    My Profile
                  </CardTitle>
                  <CardDescription>View your progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-purple-600">Track</p>
                  <p className="text-sm text-gray-600">Learning progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <GraduationCap className="mr-2 h-5 w-5 text-orange-600" />
                    Achievements
                  </CardTitle>
                  <CardDescription>Certificates earned</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-orange-600">0</p>
                  <p className="text-sm text-gray-600">Certificates</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Your recent course activity will appear here.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Your upcoming tutoring sessions will appear here.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavigation()}
      <div className="container mx-auto p-6">
        {renderContent()}
      </div>
    </div>
  );
}
