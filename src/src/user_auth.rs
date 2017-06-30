use std::error::Error;
use std::io;

struct UserInfo {
    username: String,
    password: String,
}

impl UserInfo {
    fn new(username: String, password: String) -> UserInfo {
        UserInfo {
            username,
            password,
        }
    }
    fn send_to_db(&self) {
        // No idea how to code this part.
        // Maybe I should encrypt the UserInfo contents before sending them out?
    }
}

pub fn login() -> Result<(), Box<Error>>{
    let curr_info = match get_user_info() {
        Ok(i) => i,
        Err(e) => return Err(e),
    };
    curr_info.send_to_db();
    Ok(())
}

fn get_user_info() -> Result<UserInfo, Box<Error>> {
    let mut username = String::new();
    println!("Username:");
    io::stdin().read_line(&mut username)?;

    let mut password = String::new();
    println!("Password:");
    io::stdin().read_line(&mut password)?;

    Ok(UserInfo::new(username, password))
}
