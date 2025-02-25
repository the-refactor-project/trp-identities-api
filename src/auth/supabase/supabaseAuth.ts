import { createClient } from "@supabase/supabase-js";
import environment from "../../environment.js";

const supabaseAuthClient = createClient(
  environment.SUPABASE_AUTH_URL,
  environment.SUPABASE_SERVICE_ROLE_KEY!
);

export default supabaseAuthClient;
