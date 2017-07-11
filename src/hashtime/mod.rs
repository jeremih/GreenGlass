use std::hash::{Hash, Hasher};

use chrono::prelude::{DateTime, Utc};

pub struct HashableTime {
    time: DateTime<Utc>
}

impl HashableTime {
    pub fn new(time: Option<DateTime<Utc>>) -> HashableTime {
        match time {
            Some(time) => HashableTime { time: time },
            None => HashableTime { time: Utc::now() }
        }
    }
}

impl Hash for HashableTime {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.time.hash(state);
    }    
}

