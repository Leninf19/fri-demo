import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import WelcomeModal from './components/WelcomeModal.jsx'
import GuidedTour from './components/GuidedTour.jsx'
import HelpWidget from './components/HelpWidget.jsx'
import DemoBanner from './components/DemoBanner.jsx'

import Overview from './pages/Overview.jsx'
import Locations from './pages/Locations.jsx'
import ReviewExplorer from './pages/ReviewExplorer.jsx'
import ComplaintIntel from './pages/ComplaintIntel.jsx'
import CompetitorIntel from './pages/CompetitorIntel.jsx'
import MarketingIntel from './pages/MarketingIntel.jsx'
import EmployeeIntel from './pages/EmployeeIntel.jsx'
import AIAdvisor from './pages/AIAdvisor.jsx'
import ResponseCenter from './pages/ResponseCenter.jsx'
import Trends from './pages/Trends.jsx'
import Alerts from './pages/Alerts.jsx'
import ExecutiveReports from './pages/ExecutiveReports.jsx'
import Reports from './pages/Reports.jsx'

export default function App() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [tourActive, setTourActive] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('fri_demo_seen')
    if (!seen) {
      setShowWelcome(true)
    }
  }, [])

  function handleStartTour() {
    localStorage.setItem('fri_demo_seen', '1')
    setShowWelcome(false)
    setTourActive(true)
  }

  function handleExplore() {
    localStorage.setItem('fri_demo_seen', '1')
    setShowWelcome(false)
  }

  function handleTourComplete() {
    setTourActive(false)
  }

  function handleRestartTour() {
    setTourActive(true)
  }

  return (
    <BrowserRouter>
      <DemoBanner />
      <WelcomeModal open={showWelcome} onStartTour={handleStartTour} onExplore={handleExplore} />
      <GuidedTour active={tourActive} onComplete={handleTourComplete} />
      <HelpWidget onRestartTour={handleRestartTour} />
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/explorer" element={<ReviewExplorer />} />
          <Route path="/intelligence" element={<ComplaintIntel />} />
          <Route path="/competitive" element={<CompetitorIntel />} />
          <Route path="/marketing" element={<MarketingIntel />} />
          <Route path="/employee" element={<EmployeeIntel />} />
          <Route path="/advisor" element={<AIAdvisor />} />
          <Route path="/actions" element={<ResponseCenter />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/executive" element={<ExecutiveReports />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
