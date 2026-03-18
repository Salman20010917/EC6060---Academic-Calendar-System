/**
 * React Query hooks built on top of the Zodios apiClient.
 * Each hook is fully typed — input and output shapes come from the Zod schemas.
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './client';

// ===============================
// Query Keys
// ===============================
export const QUERY_KEYS = {
  events: ['events'] as const,
  event: (id: string) => ['events', id] as const,
  dashboardSummary: ['dashboard', 'summary'] as const,
  pendingEvents: ['hod', 'pending-events'] as const,
  hodNotifications: ['hod', 'notifications'] as const,
  adminUsers: ['admin', 'users'] as const,
  studentEvents: ['student', 'events'] as const,
  notifications: (unread?: boolean) => ['notifications', { unread }] as const,
  notificationCount: ['notifications', 'count'] as const,
  todos: ['todos'] as const,
};

// ===============================
// Auth Hooks
// ===============================

/** POST /auth/login */
export function useLogin() {
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      apiClient.login(credentials),
  });
}

/** POST /auth/signup */
export function useSignup() {
  return useMutation({
    mutationFn: (data: { first_name: string; last_name: string; email: string; password: string }) =>
      apiClient.signup(data),
  });
}

/** POST /auth/forgot-password */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: { email: string }) => apiClient.forgotPassword(data),
  });
}

/** POST /auth/reset-password */
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: { token: string; newPassword: string }) =>
      apiClient.resetPassword(data),
  });
}

// ===============================
// Events Hooks
// ===============================

/** GET /events */
export function useEvents(params?: { start?: string; end?: string }) {
  return useQuery({
    queryKey: [...QUERY_KEYS.events, params],
    queryFn: () => apiClient.getEvents({ queries: params ?? {} }),
  });
}

/** GET /events/:id */
export function useEvent(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.event(id),
    queryFn: () => apiClient.getEvent({ params: { id } }),
    enabled: !!id,
  });
}

/** POST /events */
export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      title: string;
      description?: string;
      event_type: string;
      location: string;
      start_datetime: string;
      end_datetime: string;
    }) => apiClient.createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.events });
    },
  });
}

/** PUT /events/:id */
export function useUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        title: string;
        description?: string;
        event_type: string;
        location: string;
        start_datetime: string;
        end_datetime: string;
      };
    }) => apiClient.updateEvent(data, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.events });
    },
  });
}

/** DELETE /events/:id */
export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.deleteEvent(undefined, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.events });
    },
  });
}

// ===============================
// Dashboard Hooks
// ===============================

/** GET /dashboard/summary */
export function useDashboardSummary() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboardSummary,
    queryFn: () => apiClient.getDashboardSummary(),
  });
}

// ===============================
// HOD Hooks
// ===============================

/** GET /hod/pending-events */
export function usePendingEvents() {
  return useQuery({
    queryKey: QUERY_KEYS.pendingEvents,
    queryFn: () => apiClient.getPendingEvents(),
  });
}

/** PUT /hod/approve/:eventId */
export function useApproveEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId: string) =>
      apiClient.approveEvent(undefined, { params: { eventId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pendingEvents });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.events });
    },
  });
}

/** PUT /hod/reject/:eventId */
export function useRejectEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, reason }: { eventId: string; reason?: string }) =>
      apiClient.rejectEvent({ reason }, { params: { eventId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pendingEvents });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.events });
    },
  });
}

/** GET /hod/notifications */
export function useHodNotifications() {
  return useQuery({
    queryKey: QUERY_KEYS.hodNotifications,
    queryFn: () => apiClient.getHodNotifications(),
  });
}

// ===============================
// Admin Hooks
// ===============================

/** GET /admin/users */
export function useAdminUsers() {
  return useQuery({
    queryKey: QUERY_KEYS.adminUsers,
    queryFn: () => apiClient.getAdminUsers(),
  });
}

/** DELETE /admin/users/:id */
export function useDeleteAdminUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.deleteAdminUser(undefined, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminUsers });
    },
  });
}

// ===============================
// Student Hooks
// ===============================

/** GET /student/events */
export function useStudentEvents() {
  return useQuery({
    queryKey: QUERY_KEYS.studentEvents,
    queryFn: () => apiClient.getStudentEvents(),
  });
}

// ===============================
// Notifications Hooks
// ===============================

/** GET /notifications */
export function useNotifications(unread?: boolean) {
  return useQuery({
    queryKey: QUERY_KEYS.notifications(unread),
    queryFn: () =>
      apiClient.getNotifications({ queries: { unread: unread ? 'true' : undefined } }),
  });
}

/** GET /notifications/count */
export function useNotificationCount() {
  return useQuery({
    queryKey: QUERY_KEYS.notificationCount,
    queryFn: () => apiClient.getNotificationCount(),
    refetchInterval: 30_000, // refresh every 30 seconds
  });
}

/** PATCH /notifications/:id/read */
export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.markNotificationRead(undefined, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

/** PATCH /notifications/read-all */
export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiClient.markAllNotificationsRead(undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

/** DELETE /notifications/:id */
export function useDeleteNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.deleteNotification(undefined, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

// ===============================
// Todos Hooks
// ===============================

/** GET /todos */
export function useTodos() {
  return useQuery({
    queryKey: QUERY_KEYS.todos,
    queryFn: () => apiClient.getTodos(),
  });
}

/** POST /todos */
export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; description?: string; due_date?: string }) =>
      apiClient.createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos });
    },
  });
}

/** PUT /todos/:id */
export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { title: string; description?: string; due_date?: string };
    }) => apiClient.updateTodo(data, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos });
    },
  });
}

/** DELETE /todos/:id */
export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.deleteTodo(undefined, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos });
    },
  });
}

/** PATCH /todos/:id/toggle */
export function useToggleTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.toggleTodo(undefined, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos });
    },
  });
}
