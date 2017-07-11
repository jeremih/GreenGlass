extern crate chrono;

mod hashtime;
mod blockchain;

fn main() { 
    let ref mut block_chain = blockchain::genesis();
    println!("Block chain is {}", block_chain);
    blockchain::generate_next_block(block_chain, "Next Data".to_string());
    println!("Block chain is {}", block_chain);
}

