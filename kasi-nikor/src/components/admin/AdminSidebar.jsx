import React from 'react'
import { assets } from '../../assets/assets'
import { LayoutDashboardIcon, PlusSquareIcon, ListIcon, ListCollapseIcon } from 'lucide-react'
import {NavLink} from 'react-router-dom'
const AdminSidebar = () => {
  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: assets.profile
  }
  
  const adminNavLinks = [
    {name:"DashBoard",path:"/admin",icon:LayoutDashboardIcon},
    {name:"Add Shows",path:"/admin/add-shows",icon:PlusSquareIcon},
    {name:"List Shows",path:"/admin/list-shows",icon:ListIcon},
    {name:"List Bookings",path:"/admin/list-bookings",icon:ListCollapseIcon},
  ]

  return (
  <div className='h-full md:flex flex-col items-center pt-8 w-16 md:w-60 border-r border-gray-300/20 text-sm'>
    <img 
      className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' 
      src={user.imageUrl} 
      alt="User Profile" 
    />
    <p className='mt-2 text-base max-md:hidden'>{user.firstName} {user.lastName}</p>
    
    <div className='w-full mt-6'>
      {adminNavLinks.map((link, index) => (
        <NavLink
          end 
          key={index} 
          to={link.path} 
          className={({ isActive }) => 
            `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 md:pl-10 first:mt-0 text-gray-400 ${
              isActive 
                ? 'bg-primary/15 text-primary group' 
                : 'hover:bg-gray-100/20 transition-colors'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <link.icon className="w-5 h-5" />
              <p className="max-md:hidden">{link.name}</p>
              {isActive && (
                <span className="w-1.5 h-10 rounded-l-lg bg-primary absolute right-0" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  </div>
);
}

export default AdminSidebar
