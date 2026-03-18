import { makeApi } from '@zodios/core';
import { z } from 'zod';
import {
  LoginRequestSchema,
  LoginResponseSchema,
  SignupRequestSchema,
  ForgotPasswordRequestSchema,
  ResetPasswordRequestSchema,
  MessageResponseSchema,
  BackendEventSchema,
  CreateEventRequestSchema,
  UpdateEventRequestSchema,
  BackendNotificationSchema,
  NotificationCountSchema,
  MarkAllReadResponseSchema,
  BackendTodoSchema,
  CreateTodoRequestSchema,
  UpdateTodoRequestSchema,
  CreateTodoResponseSchema,
  DashboardSummarySchema,
  BackendAdminUserSchema,
  RejectEventRequestSchema,
  PendingEventsResponseSchema,
  HodNotificationsResponseSchema,
} from './schemas';

export const apiContract = makeApi([

  // ===============================
  // Auth
  // ===============================

  {
    method: 'post',
    path: '/auth/login',
    alias: 'login',
    description: 'Login with email and password',
    parameters: [{ name: 'body', type: 'Body', schema: LoginRequestSchema }],
    response: LoginResponseSchema,
  },
  {
    method: 'post',
    path: '/auth/signup',
    alias: 'signup',
    description: 'Register / activate account',
    parameters: [{ name: 'body', type: 'Body', schema: SignupRequestSchema }],
    response: MessageResponseSchema,
  },
  {
    method: 'post',
    path: '/auth/forgot-password',
    alias: 'forgotPassword',
    description: 'Send password reset email',
    parameters: [{ name: 'body', type: 'Body', schema: ForgotPasswordRequestSchema }],
    response: MessageResponseSchema,
  },
  {
    method: 'post',
    path: '/auth/reset-password',
    alias: 'resetPassword',
    description: 'Reset password with token',
    parameters: [{ name: 'body', type: 'Body', schema: ResetPasswordRequestSchema }],
    response: MessageResponseSchema,
  },

  // ===============================
  // Events
  // ===============================

  {
    method: 'get',
    path: '/events',
    alias: 'getEvents',
    description: 'Get all events (role-filtered)',
    parameters: [
      { name: 'start', type: 'Query', schema: z.string().optional() },
      { name: 'end', type: 'Query', schema: z.string().optional() },
    ],
    response: z.array(BackendEventSchema),
  },
  {
    method: 'get',
    path: '/events/:id',
    alias: 'getEvent',
    description: 'Get a single event by ID',
    parameters: [{ name: 'id', type: 'Path', schema: z.string() }],
    response: BackendEventSchema,
  },
  {
    method: 'post',
    path: '/events',
    alias: 'createEvent',
    description: 'Create a new event',
    parameters: [{ name: 'body', type: 'Body', schema: CreateEventRequestSchema }],
    response: MessageResponseSchema,
  },
  {
    method: 'put',
    path: '/events/:id',
    alias: 'updateEvent',
    description: 'Update an existing event',
    parameters: [
      { name: 'id', type: 'Path', schema: z.string() },
      { name: 'body', type: 'Body', schema: UpdateEventRequestSchema },
    ],
    response: MessageResponseSchema,
  },
  {
    method: 'delete',
    path: '/events/:id',
    alias: 'deleteEvent',
    description: 'Delete an event',
    parameters: [{ name: 'id', type: 'Path', schema: z.string() }],
    response: MessageResponseSchema,
  },

  // ===============================
  // Dashboard
  // ===============================

  {
    method: 'get',
    path: '/dashboard/summary',
    alias: 'getDashboardSummary',
    description: 'Get role-specific dashboard summary',
    response: DashboardSummarySchema,
  },

  // ===============================
  // HOD
  // ===============================

  {
    method: 'get',
    path: '/hod/dashboard',
    alias: 'hodDashboard',
    description: 'HOD dashboard welcome',
    response: z.object({ success: z.boolean(), message: z.string(), user: z.any() }),
  },
  {
    method: 'get',
    path: '/hod/pending-events',
    alias: 'getPendingEvents',
    description: 'List events pending HOD approval',
    response: PendingEventsResponseSchema,
  },
  {
    method: 'put',
    path: '/hod/approve/:eventId',
    alias: 'approveEvent',
    description: 'Approve a pending event',
    parameters: [{ name: 'eventId', type: 'Path', schema: z.string() }],
    response: MessageResponseSchema,
  },
  {
    method: 'put',
    path: '/hod/reject/:eventId',
    alias: 'rejectEvent',
    description: 'Reject a pending event',
    parameters: [
      { name: 'eventId', type: 'Path', schema: z.string() },
      { name: 'body', type: 'Body', schema: RejectEventRequestSchema },
    ],
    response: MessageResponseSchema,
  },
  {
    method: 'get',
    path: '/hod/notifications',
    alias: 'getHodNotifications',
    description: 'Get HOD notifications',
    response: HodNotificationsResponseSchema,
  },

  // ===============================
  // Admin
  // ===============================

  {
    method: 'get',
    path: '/admin/dashboard',
    alias: 'adminDashboard',
    description: 'Admin dashboard welcome',
    response: z.object({ message: z.string(), user: z.any() }),
  },
  {
    method: 'get',
    path: '/admin/users',
    alias: 'getAdminUsers',
    description: 'Get all users (admin only)',
    response: z.array(BackendAdminUserSchema),
  },
  {
    method: 'delete',
    path: '/admin/users/:id',
    alias: 'deleteAdminUser',
    description: 'Delete a user (admin only)',
    parameters: [{ name: 'id', type: 'Path', schema: z.string() }],
    response: MessageResponseSchema,
  },

  // ===============================
  // Lecturer
  // ===============================

  {
    method: 'get',
    path: '/lecturer/dashboard',
    alias: 'lecturerDashboard',
    description: 'Lecturer dashboard welcome',
    response: z.object({ message: z.string(), user: z.any() }),
  },
  {
    method: 'post',
    path: '/lecturer/events',
    alias: 'lecturerCreateEvent',
    description: 'Create event as lecturer',
    parameters: [{ name: 'body', type: 'Body', schema: CreateEventRequestSchema }],
    response: z.object({
      success: z.boolean(),
      message: z.string(),
      data: z.object({ eventId: z.number() }).optional(),
    }),
  },

  // ===============================
  // Student
  // ===============================

  {
    method: 'get',
    path: '/student/dashboard',
    alias: 'studentDashboard',
    description: 'Student dashboard welcome',
    response: z.object({ success: z.boolean(), message: z.string(), user: z.any() }),
  },
  {
    method: 'get',
    path: '/student/events',
    alias: 'getStudentEvents',
    description: 'Get approved events for student',
    response: z.array(BackendEventSchema),
  },

  // ===============================
  // Technical Officer
  // ===============================

  {
    method: 'get',
    path: '/to/dashboard',
    alias: 'toDashboard',
    description: 'Technical Officer dashboard',
    response: z.object({ message: z.string(), user: z.any() }),
  },

  // ===============================
  // Notifications
  // ===============================

  {
    method: 'get',
    path: '/notifications',
    alias: 'getNotifications',
    description: 'Get notifications (optionally filter unread)',
    parameters: [
      { name: 'unread', type: 'Query', schema: z.string().optional() },
    ],
    response: z.array(BackendNotificationSchema),
  },
  {
    method: 'get',
    path: '/notifications/count',
    alias: 'getNotificationCount',
    description: 'Get unread notification count',
    response: NotificationCountSchema,
  },
  {
    method: 'patch',
    path: '/notifications/:id/read',
    alias: 'markNotificationRead',
    description: 'Mark a single notification as read',
    parameters: [{ name: 'id', type: 'Path', schema: z.string() }],
    response: MessageResponseSchema,
  },
  {
    method: 'patch',
    path: '/notifications/read-all',
    alias: 'markAllNotificationsRead',
    description: 'Mark all notifications as read',
    response: MarkAllReadResponseSchema,
  },
  {
    method: 'delete',
    path: '/notifications/:id',
    alias: 'deleteNotification',
    description: 'Delete a notification',
    parameters: [{ name: 'id', type: 'Path', schema: z.string() }],
    response: MessageResponseSchema,
  },

  // ===============================
  // Todos
  // ===============================

  {
    method: 'post',
    path: '/todos',
    alias: 'createTodo',
    description: 'Create a new todo',
    parameters: [{ name: 'body', type: 'Body', schema: CreateTodoRequestSchema }],
    response: CreateTodoResponseSchema,
  },
  {
    method: 'get',
    path: '/todos',
    alias: 'getTodos',
    description: 'Get all todos for current user',
    response: z.array(BackendTodoSchema),
  },
  {
    method: 'put',
    path: '/todos/:id',
    alias: 'updateTodo',
    description: 'Update a todo',
    parameters: [
      { name: 'id', type: 'Path', schema: z.string() },
      { name: 'body', type: 'Body', schema: UpdateTodoRequestSchema },
    ],
    response: MessageResponseSchema,
  },
  {
    method: 'delete',
    path: '/todos/:id',
    alias: 'deleteTodo',
    description: 'Delete a todo',
    parameters: [{ name: 'id', type: 'Path', schema: z.string() }],
    response: MessageResponseSchema,
  },
  {
    method: 'patch',
    path: '/todos/:id/toggle',
    alias: 'toggleTodo',
    description: 'Toggle todo done/undone',
    parameters: [{ name: 'id', type: 'Path', schema: z.string() }],
    response: MessageResponseSchema,
  },
]);
