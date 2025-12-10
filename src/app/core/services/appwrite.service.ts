import { Injectable } from '@angular/core';
import { Account, Client, Databases, Query } from 'appwrite';

import { environment } from '../../../environments/environment';
import { SessionList } from '../../shared/interfaces/session.interface';
import { Contact, Deal, Meeting } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  private client: Client;
  private account: Account;
  private databases: Databases;

  constructor() {
    this.client = new Client()
      .setEndpoint(environment.appwrite.endpoint)
      .setProject(environment.appwrite.projectId);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  // Authentication methods
  async login(email: string, password: string) {
    return await this.account.createEmailPasswordSession(email, password);
  }

  async signup(name: string, email: string, password: string, companyName: string) {
    // Create user account
    const user = await this.account.create('unique()', email, password, name);

    // Create session for the new user
    await this.account.createEmailPasswordSession(email, password);

    // Generate a unique tenant ID for the company
    const tenantId = `tenant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Set user preferences with company info and tenant ID
    await this.account.updatePrefs({
      tenantId,
      companyName,
      role: 'admin', // First user becomes admin
      permissions: ['read', 'write', 'delete', 'admin'],
    });

    return user;
  }

  async logout() {
    return await this.account.deleteSession('current');
  }

  async getCurrentUser() {
    return await this.account.get();
  }

  async getUserPrefs() {
    return await this.account.getPrefs();
  }

  // Session management methods
  async getCurrentSession() {
    try {
      return await this.account.getSession('current');
    } catch (error) {
      return null;
    }
  }

  async getAllSessions(): Promise<SessionList> {
    try {
      return await this.account.listSessions();
    } catch (error) {
      return { total: 0, sessions: [] };
    }
  }

  async deleteSession(sessionId = 'current') {
    return await this.account.deleteSession(sessionId);
  }

  async deleteAllSessions() {
    return await this.account.deleteSessions();
  }

  // Check if user has an active session
  async hasActiveSession(): Promise<boolean> {
    try {
      const session = await this.getCurrentSession();
      return session !== null;
    } catch (error) {
      return false;
    }
  }

  async updateUserPrefs(prefs: any) {
    return await this.account.updatePrefs(prefs);
  }

  // Contacts CRUD
  async getContacts(tenantId: string): Promise<Contact[]> {
    const response = await this.databases.listDocuments(
      environment.appwrite.databaseId,
      environment.appwrite.collections.contacts,
      [Query.equal('tenantId', tenantId)],
    );
    return response.documents as unknown as Contact[];
  }

  async createContact(
    contact: Omit<Contact, '$id' | '$createdAt' | '$updatedAt'>,
  ): Promise<Contact> {
    const response = await this.databases.createDocument(
      environment.appwrite.databaseId,
      environment.appwrite.collections.contacts,
      'unique()',
      contact,
    );
    return response as unknown as Contact;
  }

  async updateContact(id: string, contact: Partial<Contact>): Promise<Contact> {
    const response = await this.databases.updateDocument(
      environment.appwrite.databaseId,
      environment.appwrite.collections.contacts,
      id,
      contact,
    );
    return response as unknown as Contact;
  }

  async deleteContact(id: string): Promise<void> {
    await this.databases.deleteDocument(
      environment.appwrite.databaseId,
      environment.appwrite.collections.contacts,
      id,
    );
  }

  // Deals CRUD
  async getDeals(tenantId: string): Promise<Deal[]> {
    const response = await this.databases.listDocuments(
      environment.appwrite.databaseId,
      environment.appwrite.collections.deals,
      [Query.equal('tenantId', tenantId)],
    );
    return response.documents as unknown as Deal[];
  }

  async createDeal(deal: Omit<Deal, '$id' | '$createdAt' | '$updatedAt'>): Promise<Deal> {
    const response = await this.databases.createDocument(
      environment.appwrite.databaseId,
      environment.appwrite.collections.deals,
      'unique()',
      deal,
    );
    return response as unknown as Deal;
  }

  async updateDeal(id: string, deal: Partial<Deal>): Promise<Deal> {
    const response = await this.databases.updateDocument(
      environment.appwrite.databaseId,
      environment.appwrite.collections.deals,
      id,
      deal,
    );
    return response as unknown as Deal;
  }

  async deleteDeal(id: string): Promise<void> {
    await this.databases.deleteDocument(
      environment.appwrite.databaseId,
      environment.appwrite.collections.deals,
      id,
    );
  }

  // Meetings CRUD
  async getMeetings(tenantId: string): Promise<Meeting[]> {
    const response = await this.databases.listDocuments(
      environment.appwrite.databaseId,
      environment.appwrite.collections.meetings,
      [Query.equal('tenantId', tenantId)],
    );
    return response.documents as unknown as Meeting[];
  }

  async createMeeting(
    meeting: Omit<Meeting, '$id' | '$createdAt' | '$updatedAt'>,
  ): Promise<Meeting> {
    const response = await this.databases.createDocument(
      environment.appwrite.databaseId,
      environment.appwrite.collections.meetings,
      'unique()',
      meeting,
    );
    return response as unknown as Meeting;
  }

  async updateMeeting(id: string, meeting: Partial<Meeting>): Promise<Meeting> {
    const response = await this.databases.updateDocument(
      environment.appwrite.databaseId,
      environment.appwrite.collections.meetings,
      id,
      meeting,
    );
    return response as unknown as Meeting;
  }

  async deleteMeeting(id: string): Promise<void> {
    await this.databases.deleteDocument(
      environment.appwrite.databaseId,
      environment.appwrite.collections.meetings,
      id,
    );
  }
}
