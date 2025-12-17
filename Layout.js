import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import {
  Home,
  Briefcase,
  Users,
  Coins,
  User,
  Menu,
  X,
  LogOut,
  Plus,
  Search,
  Bell,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "Home", icon: Home },
  { name: "Find Jobs", href: "Jobs", icon: Briefcase },
  { name: "Providers", href: "Providers", icon: Users },
  { name: "Post a Job", href: "PostJob", icon: Plus },
];

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: providerProfile } = useQuery({
    queryKey: ["myProvider", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
 
