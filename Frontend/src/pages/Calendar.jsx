import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from 'lucide-react';

const events = [
  { id: 1, title: 'Budget Review Meeting', time: '10:00 AM - 11:30 AM', date: '2024-01-15', location: 'Conference Room A', attendees: 8, type: 'meeting', color: 'bg-blue-500' },
  { id: 2, title: 'New Employee Orientation', time: '2:00 PM - 4:00 PM', date: '2024-01-16', location: 'Training Room B', attendees: 12, type: 'training', color: 'bg-emerald-500' },
  { id: 3, title: 'Department Heads Meeting', time: '9:00 AM - 10:00 AM', date: '2024-01-17', location: 'Executive Boardroom', attendees: 6, type: 'meeting', color: 'bg-purple-500' },
  { id: 4, title: 'IT Security Training', time: '1:00 PM - 3:00 PM', date: '2024-01-18', location: 'Computer Lab', attendees: 25, type: 'training', color: 'bg-amber-500' },
  { id: 5, title: 'Quarterly Review', time: '3:00 PM - 5:00 PM', date: '2024-01-19', location: 'Main Auditorium', attendees: 45, type: 'review', color: 'bg-red-500' },
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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
                ? 'bg-blue-100 text-blue-600' 
                : 'hover:bg-gray-100'
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
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Calendar</h2>
            <p className="text-gray-600 mt-1">Schedule and manage government events and meetings.</p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex items-center space-x-2">
              <button onClick={() => navigateMonth('prev')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => navigateMonth('next')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {daysOfWeek.map(day => (
              <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>
        </div>

        {/* Events for Selected Date */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Events for {selectedDate.toLocaleDateString()}
          </h3>
          <div className="space-y-4">
            {getEventsForSelectedDate().length > 0 ? (
              getEventsForSelectedDate().map(event => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full ${event.color} mt-1.5`}></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">{event.title}</h4>
                      <div className="space-y-1 text-sm text-gray-600">
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
                <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No events scheduled for this date</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.slice(0, 6).map(event => (
            <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className={`w-3 h-3 rounded-full ${event.color} mt-1.5`}></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{event.time}</span>
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
