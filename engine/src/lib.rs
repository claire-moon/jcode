use wasm_bindgen::prelude::*;
use std::collections::HashMap;
use std::sync::Mutex;
use once_cell::sync::Lazy;

static VFS: Lazy<Mutex<HashMap<String, String>>> = Lazy::new(|| {

   Mutex::new(HashMap::new())

});

#[wasm_bindgen]

pub fn writeFile(path: &str, content: &str) {

    let mut vfs = VFS.lock().unwrap();
    vfs.insert(path.to_string(), content.to_string());

}

#[wasm_bindgen]

pub fn runFile(path: &str) -> String {

    let vfs = VFS.lock().unwrap();

    match vfs.get(path) {

        Some(content) => content.clone(),
        None => format!("FILE NOT FOUND: {}", path),

    }

}
