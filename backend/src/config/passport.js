import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import GitHubStrategy from 'passport-github2';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

