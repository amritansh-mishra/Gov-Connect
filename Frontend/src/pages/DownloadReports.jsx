import React from 'react';
import { useTranslation } from 'react-i18next';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

const DownloadReports = () => {
  const { t } = useTranslation();

  const projects = [
    { id: 1, name: 'Smart City Initiative', department: 'Urban Development' },
    { id: 2, name: 'Clean Rivers Project', department: 'Health' },
    { id: 3, name: 'New School Construction', department: 'Education' },
  ];

  const handleDownloadReport = async (projectId, projectName) => {
    const input = document.getElementById(`project-report-${projectId}`);
    if (input) {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`${projectName}_${t('report')}.pdf`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-text mb-6">{t('downloadableReports')}</h1>

        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6 flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1 mb-4 md:mb-0">
                <h2 className="text-xl font-semibold text-text mb-1">{project.name}</h2>
                <p className="text-lightText text-sm">{t('department')}: {project.department}</p>
              </div>
              <button
                onClick={() => handleDownloadReport(project.id, project.name)}
                className="bg-primary text-white px-5 py-2 rounded-lg shadow-md hover:bg-primary/90 transition duration-300 flex items-center"
              >
                <Download className="w-5 h-5 mr-2" />
                {t('downloadPdf')}
              </button>

              {/* Hidden content to be captured by html2canvas */}
              <div id={`project-report-${project.id}`} className="absolute -left-[9999px] -top-[9999px] w-full p-8 bg-background text-text">
                <h1 className="text-2xl font-bold mb-4 text-text">{project.name} - {t('projectReport')}</h1>
                <p className="text-sm text-lightText mb-2">{t('department')}: {project.department}</p>
                <p className="text-sm text-lightText mb-4">{t('date')}: {new Date().toLocaleDateString()}</p>
                
                <h2 className="text-xl font-semibold mb-3 text-text">{t('summary')}</h2>
                <p className="mb-4 text-lightText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                <h2 className="text-xl font-semibold mb-3 text-text">{t('financialOverview')}</h2>
                <ul className="list-disc list-inside mb-4 text-lightText">
                  <li>{t('fundsUsed')}: ₹{projects[0].fundsUsed}M</li>
                  <li>{t('totalFunds')}: ₹{projects[0].totalFunds}M</li>
                </ul>

                <h2 className="text-xl font-semibold mb-3 text-text">{t('milestones')}</h2>
                <ul className="list-disc list-inside mb-4 text-lightText">
                  <li>{t('phase1')}: {t('completed')}</li>
                  <li>{t('phase2')}: {t('inProgress')}</li>
                </ul>

                <h2 className="text-xl font-semibold mb-3 text-text">{t('citizenFeedbackSummary')}</h2>
                <p className="mb-4 text-lightText">{t('totalFeedback')}: 450, {t('averageRating')}: 4.2/5</p>

                <p className="text-xs text-lightText mt-8">{t('reportGeneratedBy')}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DownloadReports;
