//This is the supabase api to get data from the postgres database.

import { createClient } from '@supabase/supabase-js';
import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } from './constants';

export const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY);