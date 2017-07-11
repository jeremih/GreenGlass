use std::time::{SystemTime};
use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};
use std::fmt::{Display, Formatter, Result};

use chrono::prelude::*;

use hashtime::{HashableTime};

#[derive(Hash)]
pub struct Block {
    data: String,
    hash: u64,
    index: u64,
    previous_hash: u64,
    timestamp: HashableTime,
}

#[derive(Hash)]
struct HashableBlockData<'a> {
    data: &'a String,
    index: &'a u64,
    previous_hash: &'a u64,
    timestamp: &'a HashableTime,
}

fn create_block_hash(data: &String, index: &u64, previous_hash: &u64, timestamp: &HashableTime) -> u64 {
    let hashdata = HashableBlockData {
        index: index,
        previous_hash: previous_hash,
        timestamp: timestamp,
        data: data,
    };

    calculate_hash(&hashdata)
}

impl Block {
    pub fn new(data: String, index: u64, previous_hash: u64, timestamp: HashableTime) -> Self {
        let hash = create_block_hash(&data, &index, &previous_hash, &timestamp);
        Block {
            data: data,
            hash: hash,
            index: index,
            previous_hash: previous_hash,
            timestamp: timestamp, 
        }
    }

    pub fn get_index(&self) -> u64 {
        self.index
    }

    pub fn get_previous_hash(&self) -> u64 {
        self.previous_hash
    }
}

pub struct BlockChain {
    pub blocks: Vec<Block>,
}

impl Display for BlockChain {
    fn fmt(&self, f: &mut Formatter) -> Result {
        write!(f, "Block Chain of length {}", self.blocks.len())
    }
}

impl BlockChain {
    fn add(&mut self, b: Block) {
        self.blocks.push(b);
    }

    fn get_latest_block(&mut self) -> &Block {
        let length: usize = self.blocks.len();
        &self.blocks[length - 1]
    }
}

fn calculate_hash<T: Hash>(t: &T) -> u64 {
    let mut s = DefaultHasher::new();
    t.hash(&mut s);
    s.finish()
}

pub fn generate_next_metadata(next_data: String, chain: &mut BlockChain) -> Block {
    let length = chain.blocks.len();
    let ref prev_block = chain.get_latest_block();
    let next_index = prev_block.index + 1;
    let next_hash = calculate_hash(prev_block);
    let next_timestamp = HashableTime::new(None);
    println!("Generating next block");
    Block::new(next_data, next_index, next_hash, next_timestamp)
}

pub fn insert_block(c: &mut BlockChain, b: Block) -> () {
    c.add(b)
}

pub fn generate_next_block(c: &mut BlockChain, d: String) -> () {
    let block = generate_next_metadata(d, c);
    let valid = validate_block(&block, c);
    if valid == true {
        insert_block(c, block)
    }
}

pub fn genesis() -> BlockChain {
    let firstdate = HashableTime::new(Option::from(Utc.ymd(2000, 7, 7).and_hms(0, 0, 0)));
    let genesis = Block::new("GENESIS BLOCK".to_string(), 0, 0, firstdate);
    let mut vec = Vec::new();
    vec.push(genesis);
    BlockChain{
        blocks: vec
    }
}

pub fn validate_block(new_block: &Block, c: &mut BlockChain) -> bool {
    let prev_block = c.get_latest_block();
    if prev_block.index + 1 != new_block.index {
        println!("invalid index");
        return false
    } else if calculate_hash(&prev_block) != new_block.previous_hash {
        println!("invalid previous hash");
        return false
    } else if create_block_hash(&new_block.data, &new_block.index, &new_block.previous_hash, &new_block.timestamp) != new_block.hash {
        println!("invalid hash on new block");
        return false
    }
    return true
}
