import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users, LogIn, LogOut } from 'lucide-react';
import ApiCalendar from 'react-google-calendar-api';

// TODO: Replace with your own Google Calendar API credentials from https://console.developers.google.com/
const CLIENT_ID = '582117416021-675eolb9mb1hqracqr9cra93hu2dbjvr.apps.googleusercontent.com'
const API_KEY = 'AIzaSyBFG6MeVcDE7iLZGEoBcTBf7VUrg1ARaTc';

const config = {
  clientId: CLIENT_ID,
  apiKey: API_KEY,
  scope: 'https://www.googleapis.com/auth/calendar.readonly',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
};

const apiCalendar = new ApiCalendar(config);

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
    // Check initial sign-in status
    if (apiCalendar.gapi) {
      setIsSignedIn(apiCalendar.gapi.auth2.getAuthInstance().isSignedIn.get());
    }
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      fetchEvents();
    }
  }, [isSignedIn]);

  const fetchEvents = () => {
    apiCalendar.listUpcomingEvents(100)
      .then(({ result }) => {
        const formattedEvents = result.items.map(event => ({
          id: event.id,
          title: event.summary,
          time: `${new Date(event.start.dateTime).toLocaleTimeString()} - ${new Date(event.end.dateTime).toLocaleTimeString()}`,
          date: event.start.dateTime.split('T')[0], // YYYY-MM-DD
          location: event.location || 'Not specified',
          attendees: event.attendees ? event.attendees.length : 0,
          color: 'bg-blue-500', // You can add logic for color based on event type
        }));
        setEvents(formattedEvents);
      })
      .catch(error => {
        console.error("Error fetching events: ", error);
      });
  };

    const handleSignIn = () => {
    apiCalendar.handleAuthClick()
      .then(() => {
        console.log('Signed in successfully');
        setIsSignedIn(true);
      })
      .catch(error => {
        console.error('Error signing in:', error);
      });
  };

    const handleSignOut = () => {
    apiCalendar.handleSignoutClick();
    setIsSignedIn(false);
    setEvents([]); // Clear events on sign out
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvent = events.some(event => event.date === dateStr);
      const isSelected = selectedDate.getDate() === day && 
                        selectedDate.getMonth() === currentDate.getMonth() && 
                        selectedDate.getFullYear() === currentDate.getFullYear();
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentDate.getMonth() && 
                     new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          className={`h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all relative ${
            isSelected 
              ? 'bg-blue-600 text-white' 
              : isToday 
                ? 'bg-primary/20 text-primary' 
                : 'hover:bg-gray-700/50'
          }`}
        >
          {day}
          {hasEvent && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
          )}
        </button>
      );
    }

    return days;
  };

  const getEventsForSelectedDate = () => {
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  return (
    <div className="p-6 bg-background text-text">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Calendar</h2>
            <p className="text-lightText mt-1">Schedule and manage government events and meetings.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
            {isSignedIn ? (
              <button onClick={handleSignOut} className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button onClick={handleSignIn} className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <LogIn className="w-4 h-4" />
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-background/50 rounded-xl shadow-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex items-center space-x-2">
              <button onClick={() => navigateMonth('prev')} className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => navigateMonth('next')} className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {daysOfWeek.map(day => (
              <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-lightText">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>
        </div>

        {/* Events for Selected Date */}
        <div className="bg-background/50 rounded-xl shadow-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4">
            Events for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h3>
          <div className="space-y-4">
            {getEventsForSelectedDate().length > 0 ? (
              getEventsForSelectedDate().map(event => (
                <div key={event.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full ${event.color} mt-1.5`}></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text mb-2">{event.title}</h4>
                      <div className="space-y-1 text-sm text-lightText">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">{isSignedIn ? 'No events scheduled for this date' : 'Sign in to view your events'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6 bg-background/50 rounded-xl shadow-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-6">Upcoming Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isSignedIn && events.length > 0 ? events.slice(0, 6).map(event => (
            <div key={event.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:bg-gray-700/50 transition-shadow">
              <div className="flex items-start space-x-3">
                <div className={`w-3 h-3 rounded-full ${event.color} mt-1.5`}></div>
                <div className="flex-1">
                  <h4 className="font-medium text-text mb-1">{event.title}</h4>
                  <p className="text-sm text-lightText mb-2">{new Date(event.date).toLocaleDateString()}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>{event.time}</span>
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-400">{isSignedIn ? 'No upcoming events.' : 'Sign in to see your upcoming events.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
