import React, { useState, useEffect } from 'react';
import { defaultBusinessConfig, BusinessConfig } from './data/businessConfig';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileStickyBar } from './components/common/MobileStickyBar';
import { AdminPortalModal } from './components/common/AdminPortalModal';
import { Breadcrumbs } from './components/common/Breadcrumbs';

// Pages
import { HomePage } from './components/pages/HomePage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { ToolsPage } from './components/pages/ToolsPage';
import { ServiceAreasPage } from './components/pages/ServiceAreasPage';
import { AboutPage } from './components/pages/AboutPage';
import { FinancingPage } from './components/pages/FinancingPage';
import { BlogPage } from './components/pages/BlogPage';
import { QuotePage } from './components/pages/QuotePage';
import { ReviewsPage } from './components/pages/ReviewsPage';

export default function App() {
  const [business, setBusiness] = useState<BusinessConfig>(defaultBusinessConfig);
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [prefillQuoteService, setPrefillQuoteService] = useState<string | undefined>(undefined);
  const [prefillEstimateData, setPrefillEstimateData] = useState<any | null>(null);
  const [initialToolTab, setInitialToolTab] = useState<string>('estimator');
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleNavigate = (tab: string, serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    setCurrentTab(tab);
  };

  const handleOpenEstimator = () => {
    setInitialToolTab('estimator');
    setCurrentTab('tools');
  };

  const handleOpenInspection = () => {
    setInitialToolTab('inspection');
    setCurrentTab('tools');
  };

  const handleSendEstimateToQuote = (estData: any) => {
    setPrefillEstimateData(estData);
    setPrefillQuoteService(estData.material);
    setCurrentTab('quote');
  };

  const handleSelectQuoteService = (serviceName: string) => {
    setPrefillQuoteService(serviceName);
    setCurrentTab('quote');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#e05d26] selection:text-white">
      <Header
        business={business}
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      <main className="flex-1 pb-16 lg:pb-0">
        <Breadcrumbs
          currentTab={currentTab}
          selectedServiceId={selectedServiceId}
          onNavigate={handleNavigate}
        />

        {currentTab === 'home' && (
          <HomePage
            business={business}
            onNavigate={handleNavigate}
            onOpenEstimator={handleOpenEstimator}
            onOpenInspection={handleOpenInspection}
          />
        )}

        {currentTab === 'services' && (
          <ServicesPage
            business={business}
            initialServiceId={selectedServiceId}
            onSelectQuote={handleSelectQuoteService}
            onBookInspection={handleOpenInspection}
            onServiceChange={(id) => setSelectedServiceId(id)}
          />
        )}

        {currentTab === 'projects' && (
          <ProjectsPage
            onRequestQuote={() => setCurrentTab('quote')}
          />
        )}

        {currentTab === 'reviews' && (
          <ReviewsPage
            business={business}
            onBookInspection={handleOpenInspection}
            onRequestQuote={() => setCurrentTab('quote')}
          />
        )}

        {currentTab === 'tools' && (
          <ToolsPage
            initialTool={initialToolTab}
            onSendEstimateToQuote={handleSendEstimateToQuote}
            onBookInspectionRequested={handleOpenInspection}
          />
        )}

        {currentTab === 'service-areas' && (
          <ServiceAreasPage
            business={business}
            onSelectQuote={() => setCurrentTab('quote')}
            onBookInspection={handleOpenInspection}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            business={business}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'financing' && (
          <FinancingPage
            onApplyOrQuote={() => setCurrentTab('quote')}
          />
        )}

        {currentTab === 'blog' && (
          <BlogPage
            onScheduleInspection={handleOpenInspection}
          />
        )}

        {currentTab === 'quote' && (
          <QuotePage
            business={business}
            prefillService={prefillQuoteService}
            prefillEstimate={prefillEstimateData}
          />
        )}
      </main>

      <Footer
        business={business}
        onNavigate={handleNavigate}
      />

      <MobileStickyBar
        business={business}
        onOpenQuote={() => setCurrentTab('quote')}
      />

      <AdminPortalModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        business={business}
        onUpdateBusiness={(updated) => setBusiness(updated)}
      />
    </div>
  );
}
