"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, logout, login } = useApp();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const isActive = (path) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  const handleRoleToggle = () => {
    if (!currentUser) return;
    const targetRole = currentUser.role === "student" ? "owner" : "student";
    const targetEmail = targetRole === "student" ? "jane@university.edu" : "alex@studynook.com";
    login(targetEmail, targetRole);
    setShowProfileDropdown(false);
  };

  return (
    <nav className="bg-surface/80 dark:bg-surface-container/80 backdrop-blur-xl border-b border-outline/10 shadow-sm sticky top-0 w-full z-50">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-max-width mx-auto">
        
        {/* Brand/Logo */}
        <Link 
          href="/" 
          className="font-headline-md text-headline-md font-extrabold text-primary dark:text-primary-fixed-dim tracking-tight flex items-center gap-2 hover:scale-[1.02] transition-transform duration-200"
        >
          <span className="material-symbols-outlined filled text-secondary">menu_book</span>
          StudyNook
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className={`font-label-md text-label-md pb-1 px-1 transition-all duration-200 ${
              isActive("/") 
                ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-secondary" 
                : "text-on-surface-variant dark:text-outline hover:text-primary"
            }`}
          >
            Home
          </Link>
          
          <Link 
            href="/rooms" 
            className={`font-label-md text-label-md pb-1 px-1 transition-all duration-200 ${
              isActive("/rooms") 
                ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-secondary" 
                : "text-on-surface-variant dark:text-outline hover:text-primary"
            }`}
          >
            Rooms
          </Link>

          {/* Student Dash Links */}
          {currentUser && currentUser.role === "student" && (
            <Link 
              href="/dashboard/bookings" 
              className={`font-label-md text-label-md pb-1 px-1 transition-all duration-200 ${
                isActive("/dashboard/bookings") 
                  ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-secondary" 
                  : "text-on-surface-variant dark:text-outline hover:text-primary"
              }`}
            >
              My Bookings
            </Link>
          )}

          {/* Owner Dash Links */}
          {currentUser && currentUser.role === "owner" && (
            <>
              <Link 
                href="/dashboard/listings" 
                className={`font-label-md text-label-md pb-1 px-1 transition-all duration-200 ${
                  isActive("/dashboard/listings") && !pathname.includes("/new")
                    ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-secondary" 
                    : "text-on-surface-variant dark:text-outline hover:text-primary"
                }`}
              >
                My Listings
              </Link>
              <Link 
                href="/dashboard/listings/new" 
                className={`font-label-md text-label-md pb-1 px-1 transition-all duration-200 ${
                  isActive("/dashboard/listings/new") 
                    ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-secondary" 
                    : "text-on-surface-variant dark:text-outline hover:text-primary"
                }`}
              >
                + Add Room
              </Link>
              <Link 
                href="/dashboard/manage" 
                className={`font-label-md text-label-md pb-1 px-1 transition-all duration-200 ${
                  isActive("/dashboard/manage") 
                    ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-secondary" 
                    : "text-on-surface-variant dark:text-outline hover:text-primary"
                }`}
              >
                Manage Bookings
              </Link>
            </>
          )}
        </div>

        {/* Actions / Auth States */}
        <div className="flex items-center gap-4 relative">
          
          {currentUser ? (
            <div className="flex items-center gap-3">
              {/* Developer Testing Badge */}
              <button 
                onClick={handleRoleToggle}
                className="hidden lg:flex items-center gap-1 text-[11px] font-bold text-secondary bg-secondary/10 hover:bg-secondary/20 px-2 py-1 rounded-full border border-secondary/20 transition-all cursor-pointer"
                title="Click to instantly toggle student/host roles for testing"
              >
                <span className="material-symbols-outlined text-[12px]">swap_horiz</span>
                {currentUser.role === "student" ? "STUDENT PROTOTYPE" : "HOST PROTOTYPE"}
              </button>

              {/* Profile Bubble */}
              <div className="relative">
                <button 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-2 hover:opacity-85 focus:outline-none cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm select-none">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden md:block font-label-md text-label-md text-primary dark:text-primary-fixed-dim">
                    {currentUser.name}
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-outline select-none">
                    {showProfileDropdown ? "arrow_drop_up" : "arrow_drop_down"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest border border-outline/10 shadow-lg rounded-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-outline/10">
                      <p className="font-label-md text-label-md text-primary dark:text-primary-fixed-dim truncate">{currentUser.name}</p>
                      <p className="text-[12px] text-on-surface-variant dark:text-outline truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold text-secondary bg-secondary/10 px-1.5 py-0.5 rounded">
                        {currentUser.role}
                      </span>
                    </div>

                    <button 
                      onClick={handleRoleToggle}
                      className="w-full text-left px-4 py-2 text-sm text-on-surface-variant hover:text-secondary hover:bg-secondary/5 transition-colors flex items-center gap-2 lg:hidden cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                      Switch to {currentUser.role === "student" ? "Host" : "Student"}
                    </button>

                    {currentUser.role === "student" ? (
                      <Link 
                        href="/dashboard/bookings" 
                        onClick={() => setShowProfileDropdown(false)}
                        className="px-4 py-2 text-sm text-on-surface-variant hover:text-secondary hover:bg-secondary/5 transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">bookmark</span>
                        My Reservations
                      </Link>
                    ) : (
                      <>
                        <Link 
                          href="/dashboard/listings" 
                          onClick={() => setShowProfileDropdown(false)}
                          className="px-4 py-2 text-sm text-on-surface-variant hover:text-secondary hover:bg-secondary/5 transition-colors flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">storefront</span>
                          My Listed Rooms
                        </Link>
                        <Link 
                          href="/dashboard/manage" 
                          onClick={() => setShowProfileDropdown(false)}
                          className="px-4 py-2 text-sm text-on-surface-variant hover:text-secondary hover:bg-secondary/5 transition-colors flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">pending_actions</span>
                          Manage Bookings
                        </Link>
                      </>
                    )}

                    <div className="border-t border-outline/10 mt-1">
                      <button 
                        onClick={() => {
                          logout();
                          setShowProfileDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-error hover:bg-error/5 transition-colors flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className="font-label-md text-label-md text-secondary border border-secondary px-4 py-2 rounded-lg hover:bg-secondary/5 transition-colors duration-200"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="font-label-md text-label-md bg-secondary text-on-secondary px-5 py-2.5 rounded-lg shadow-sm hover:shadow-secondary/20 hover:scale-[1.02] transition-all duration-200 ease-out active:scale-95"
              >
                Register
              </Link>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}
