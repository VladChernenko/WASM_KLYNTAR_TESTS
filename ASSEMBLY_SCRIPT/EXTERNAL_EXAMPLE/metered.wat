(module
 (type $i32_=>_none (func (param i32)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (import "metering" "usegas" (func $fimport$0 (param i32)))
 (memory $0 0)
 (export "testAdding" (func $0))
 (export "memory" (memory $0))
 (func $0 (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (call $fimport$0
   (i32.const 92)
  )
  (loop $label$1
   (call $fimport$0
    (i32.const 377)
   )
   (if
    (i32.gt_s
     (local.get $0)
     (local.get $2)
    )
    (block
     (call $fimport$0
      (i32.const 872)
     )
     (local.set $3
      (i32.add
       (local.get $1)
       (local.get $3)
      )
     )
     (local.set $2
      (i32.add
       (local.get $2)
       (i32.const 1)
      )
     )
     (br $label$1)
    )
   )
  )
  (call $fimport$0
   (i32.const 211)
  )
  (local.get $3)
 )
)
