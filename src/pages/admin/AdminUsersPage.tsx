import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/lib/supabase-helpers';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Search, Users, Shield, User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'user';
}

const roleColors: Record<string, string> = {
  admin: 'bg-red-100 text-red-800',
  moderator: 'bg-blue-100 text-blue-800',
  user: 'bg-gray-100 text-gray-800',
};

const AdminUsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('user');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profiles, isLoading: profilesLoading } = useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Profile[];
    },
  });

  const { data: allRoles, isLoading: rolesLoading } = useQuery({
    queryKey: ['admin-user-roles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*');
      
      if (error) throw error;
      return data as UserRole[];
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      // First, delete existing roles for this user
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);
      
      if (deleteError) throw deleteError;

      // Then insert the new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: role as 'admin' | 'moderator' | 'user' });
      
      if (insertError) throw insertError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-user-roles'] });
      toast({ title: 'User role updated successfully' });
      setSelectedUser(null);
    },
    onError: (error) => {
      toast({ title: 'Error updating role', description: error.message, variant: 'destructive' });
    },
  });

  const getUserRole = (userId: string): string => {
    const userRole = allRoles?.find(r => r.user_id === userId);
    return userRole?.role || 'user';
  };

  const handleViewUser = (profile: Profile) => {
    setSelectedUser(profile);
    setSelectedRole(getUserRole(profile.user_id));
    const roles = allRoles?.filter(r => r.user_id === profile.user_id) || [];
    setUserRoles(roles);
  };

  const handleUpdateRole = () => {
    if (!selectedUser) return;
    updateRoleMutation.mutate({ userId: selectedUser.user_id, role: selectedRole });
  };

  const isLoading = profilesLoading || rolesLoading;

  const filteredUsers = profiles?.filter((profile) => {
    const matchesSearch = 
      profile.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (profile.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    if (roleFilter === 'all') return matchesSearch;
    
    const userRole = getUserRole(profile.user_id);
    return matchesSearch && userRole === roleFilter;
  });

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email[0].toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage user accounts and roles</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredUsers && filteredUsers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((profile) => {
                  const role = getUserRole(profile.user_id);
                  return (
                    <TableRow key={profile.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={profile.avatar_url || undefined} />
                            <AvatarFallback>
                              {getInitials(profile.full_name, profile.email)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {profile.full_name || 'No name'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{profile.email}</TableCell>
                      <TableCell>{profile.phone || '-'}</TableCell>
                      <TableCell>
                        <Badge className={roleColors[role]}>
                          <Shield className="h-3 w-3 mr-1" />
                          {role}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(new Date(profile.created_at), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewUser(profile)}
                        >
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No users found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage User</DialogTitle>
            <DialogDescription>
              View and update user information and role
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar_url || undefined} />
                  <AvatarFallback className="text-lg">
                    {getInitials(selectedUser.full_name, selectedUser.email)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg">{selectedUser.full_name || 'No name'}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  {selectedUser.phone && (
                    <p className="text-sm text-muted-foreground">{selectedUser.phone}</p>
                  )}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Joined: {format(new Date(selectedUser.created_at), 'MMMM d, yyyy')}</p>
              </div>

              {/* Role Management */}
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-medium">Role Management</h4>
                <div className="space-y-2">
                  <Label>Assign Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4" />
                          User
                        </div>
                      </SelectItem>
                      <SelectItem value="moderator">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Moderator
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-red-500" />
                          Admin
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setSelectedUser(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateRole} disabled={updateRoleMutation.isPending}>
                    {updateRoleMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsersPage;
