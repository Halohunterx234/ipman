// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
// Invoked from the front-end OR auto runs every few seconds
// auto-running will be handled by the front-end
// https://tauri.app/develop/calling-rust
fn check_ports() -> Result<> {

}

// Invoked from the front-end
// At the end, send via tauri's channels back to the front-end
//https://tauri.app/develop/calling-frontend
fn modify_port() -> Result<> {

}



