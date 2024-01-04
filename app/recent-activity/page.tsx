"use client";
import Header from "../header";
import dynamic from 'next/dynamic'

const LeftDash = dynamic(() => import('../components/LeftDash'), {
  loading: () => <p>Loading...</p>,
})
const MiddleRecentActivity = dynamic(() => import('../components/MiddleRecentActivity'), {
  loading: () => <p>Loading...</p>,
})
const RightOnTheGo = dynamic(() => import('../components/RightOnTheGo'), {
  loading: () => <p>Loading...</p>,
})

export default function RecentActivity() {
  return (
    <div>
      <Header path="recent-activity" />
      <div className="main-body">
        <LeftDash path="recent-activity" />
        <MiddleRecentActivity />
        <RightOnTheGo />
      </div>
    </div>
  );
}
