//! Pixuli WASM 图片处理库
//!
//! 提供图片压缩、AI分析等功能的WebAssembly接口

#![deny(clippy::all)]

use napi_derive::napi;

/// 简单的加法函数，用于测试WASM接口
#[napi]
pub fn plus_100(input: u32) -> u32 {
  input + 100
}

mod test {
  #[test]
  fn test_plus_100_function() {
    let result = crate::plus_100(50);
    assert_eq!(result, 150);
  }
}
