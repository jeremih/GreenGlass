use std::io;

struct userInfo {
    username: String,
    password: String,
}

impl userInfo {
    fn new(username: String, password: String) -> userInfo {
        userInfo {
            username,
            password,
        }
    }
}

pub fn login() {
    let currInfo = match getUserInfo() {
        Ok(i) => i,
        Err(e) => panic!("gahhh"),
    };
}

fn getUserInfo() -> Result<userInfo, Box<std::error::Error>> {
    let mut username = String::new();
    println!("Username:");
    std::io::stdin().read_line(&mut username)?;

    let mut password = String::new();
    println!("Password:");
    std::io::stdin().read_line(&mut password)?;

    Ok(userInfo::new(username, password))
}
