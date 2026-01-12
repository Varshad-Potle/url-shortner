import supabase, { supabaseUrl } from "./supabase";

export async function login({email, password}) {
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const {data: session, error} = await supabase.auth.getSession();
  if (!session.session) return null;

  // const {data, error} = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return session.session?.user;
}

// signup function 
export async function signup({name, email, password, profile_pic}) {
  // filename makes username of the format firstName-lastName
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

  // upload pfp
  const {error: storageError} = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message);

  // signup user and store metadata(name and public URL for pfp)
  const {data, error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

// logout function
export async function logout(){
  const {error} = await supabase.auth.signOut();
  if(error) throw new Error(error.message);
}