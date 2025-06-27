import React, { useState, useEffect } from 'react';
import Title from './Title';
import BlurCircle from '../../components/BlurCircle';
import { 
  ChartLineIcon, 
  CircleDollarSignIcon, 
  PlayCircleIcon, 
  UsersIcon,
  StarIcon
} from 'lucide-react';
import { dummyDashboardData } from '../../assets/assets'; // Import the dashboard data
import Loader from '../../components/Loading';

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  });
  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    { title: "Total Bookings", value: dashboardData.totalBookings || "0", icon: ChartLineIcon },
    { title: "Total Revenue", value: `${currency}${dashboardData.totalRevenue || "0"}`, icon: CircleDollarSignIcon },
    { title: "Active Shows", value: dashboardData.activeShows?.length || "0", icon: PlayCircleIcon },
    { title: "Total Users", value: dashboardData.totalUser || "0", icon: UsersIcon }
  ];

  const fetchDashboardData = async () => {
    // Use the imported dashboard data
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="px-4 py-6 md:px-8">
      <Title text1="Admin" text2="Dashboard" />
      
      <div className="relative mt-6">
        <BlurCircle top="-100px" left="0" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardCards.map((card, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="text-sm text-gray-600">{card.title}</h3>
                <p className="text-xl font-medium mt-1">{card.value}</p>
              </div>
              <card.icon className="w-8 h-8 text-primary" />
            </div>
          ))}
        </div>
      </div>

      <p className='mt-10 text-lg font-medium'>Active Shows</p>
      
      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        <BlurCircle top="100px" left="-10%" />
        
        {dashboardData.activeShows.map((show) => (
          <div 
            key={show._id} 
            className="w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
          >
            <img 
              src={show.movie.poster_path} 
              alt={show.movie.title} 
              className="h-60 w-full object-cover" 
            />
            <p className="font-medium p-2 truncate">{show.movie.title}</p>
            
            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">{currency}{show.showPrice}</p>
              
              <div className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                <StarIcon className="w-4 h-4 text-primary fill-primary" />
                {show.movie.vote_average.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;