(module
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $i32_=>_none (func (param i32)))
 (import "metering" "usegas" (func $fimport$0 (param i32)))
 (memory $0 0)
 (export "AddInts" (func $0))
 (export "SubInts" (func $1))
 (export "memory" (memory $0))
 (func $0 (param $0 i32) (param $1 i32) (result i32)
  (call $fimport$0
   (i32.const 376)
  )
  (i32.add
   (local.get $0)
   (local.get $1)
  )
 )
 (func $1 (param $0 i32) (param $1 i32) (result i32)
  (call $fimport$0
   (i32.const 376)
  )
  (i32.sub
   (local.get $0)
   (local.get $1)
  )
 )
)
