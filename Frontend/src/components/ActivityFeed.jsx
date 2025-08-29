import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, User, FileText, Users, CheckCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'document',
    title: 'newPolicyDocumentUploaded',
    description: 'healthcareBenefitsPolicy',
    time: 'twoHoursAgo',
    icon: FileText,
    color: 'bg-blue-500/20 text-primary',
  },
  {
    id: 2,
    type: 'user',
    title: 'newEmployeeOnboarded',
    description: 'michaelChenJoinedIT',
    time: 'fourHoursAgo',
    icon: User,
    color: 'bg-emerald-500/20 text-secondary',
  },
  {
    id: 3,
    type: 'meeting',
    title: 'departmentMeetingCompleted',
    description: 'q4PlanningFinance',
    time: 'oneDayAgo',
    icon: Users,
    color: 'bg-amber-500/20 text-accent',
  },
  {
    id: 4,
    type: 'task',
    title: 'budgetApprovalCompleted',
    description: 'q1BudgetApproved',
    time: 'twoDaysAgo',
    icon: CheckCircle,
    color: 'bg-primary/20 text-primary',
  },
];

export default function ActivityFeed() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text">{t('recentActivity')}</h3>
        <button className="text-sm text-primary hover:text-primary/90 font-medium">
          {t('viewAll')}
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`flex-shrink-0 p-2 rounded-lg ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text">{t(activity.title)}</p>
              <p className="text-sm text-lightText mt-1">{t(activity.description)}</p>
              <div className="flex items-center mt-2 text-xs text-lightText">
                <Clock className="w-3 h-3 mr-1" />
                {t(activity.time)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}