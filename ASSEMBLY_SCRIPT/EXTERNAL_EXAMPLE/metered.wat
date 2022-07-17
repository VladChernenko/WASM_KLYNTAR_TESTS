(module
 (type $i32_=>_none (func (param i32)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (import "some_kly_env.js" "anotherName" (func $fimport$0 (param i32)))
 (import "metering" "usegas" (func $fimport$1 (param i32)))
 (memory $0 0)
 (export "AddInts" (func $0))
 (export "memory" (memory $0))
 (func $0 (param $0 i32) (param $1 i32) (result i32)
  (call $fimport$1
   (i32.const 586)
  )
  (call $fimport$0
   (local.get $0)
  )
  (i32.add
   (local.get $0)
   (local.get $1)
  )
 )
)
