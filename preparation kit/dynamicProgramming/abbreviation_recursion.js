'use strict'

function abbreviation(a, b) {
    // return boolean result
    function abbrev(a, b) {
        function isUpperCase(char) {
            return char.toUpperCase() === char;
        }

        let idxA = a.length - 1, idxB = b.length - 1;
        do {
            let charA = a[idxA], charB = b[idxB];
            if (charA === charB) {
                idxA--;
                idxB--;
            }
            else {  // charA !== charB
                if (isUpperCase(charA))
                    return false;
                else {  // charA is lower case
                    if (charA.toUpperCase() === charB) {
                        let sliceA = a.slice(0, idxA), sliceB = b.slice(0, idxB), sliceB1 = b.slice(0, idxB + 1);
                        return abbrev(sliceA, sliceB) || abbrev(sliceA, sliceB1);
                    }
                    else
                        idxA--;
                }
            }
        } while (idxA >= 0 && idxB >= 0)

        if (idxB < 0) {
            if (idxA >= 0) {
                let leftA = a.slice(0, idxA + 1);
                return (leftA.toLowerCase() === leftA) ? true : false;
            }
            else
                return true;
        }
        else
            return false;
    }

    return abbrev(a, b) ? 'YES' : 'NO';
}

countTime(main)();

function countTime(func) {
    let savedThis = this;
    return function (...args) {
        let start = new Date();
        let result = func.apply(savedThis, args);
        let end = new Date();
        console.log(`${((end - start) / 1000).toFixed(8)} seconds spent.`);
        return result;
    }
}
function main() {
    let inputs = [`1
    daBcd
    ABC`];

    inputs = [`3
    AbCdE
    AFE
    beFgH
    EFG
    beFgH
    EFH`];

    inputs = [`10
    SVAHHHMVIIDYIcOSHMDUAVJRIBxBZQSUBIVEBHfVTZVSHATUYDJGDRRUBQFHEEEUZLQGXTNKFWUYBAeFKUHSFLZEUINBZYRIXOPYYXAEZZWELUPIEIWGZHEIYIROLQLAVHhMKRDSOQTJYYLTCTSIXIDAnPIHNXENWFFZFJASRZRDAPVYPAViVBLVGRHObnwlcyprcfhdpfjkyvgyzpovsgvlqbhtwrucvszaqinbgeafuswkjrcexvyzq
    SVAHHHMVIIDYIOSHMDUAVJRIBBZQSUBIVEBHVTZVSHATUYDJGDRRUBQFHEEEUZLQGXTNKFWUYBAFKUHSFLZEUINBZYRIXOPYYXAEZZWELUPIEIWGZHEIYIROLQLAVHMKRDSOQTJYYLTCTSIXIDAPIHNXENWFFZFJASRZRDAPVYPAVVBLVGRHO
    WIRUQDCAQUTtZVVAzLKMVWIOXLBESKUQSUOAEHEFMMhwwiyrqhaiixtqhaynwcsoihabohxepjbyroaglaobfwwzymlijsdhdsqlxazqggesnhdnblqbgouwjyowpjfmbshfenrtcoqyszmpamoaehnepi
    WIRUQDCAQUTZVVALKMVWIOXLBESKUQSUOAEHEFMM
    EPgDKTFPMjMXHIOYEFAFDWqNXNXCYOQwXOYDHNEJGBIKZYxiPrUALJFEVMRJEVKWZXNEMMPWAXMCAOjAsAGBhYTTKZHITGSYQQGyUMSLVDSFWOLJICNEWUBOMNOBOuFKUMREWGTObXRFKORKVUWNZMWCPXJGQNJETWHyKPNBYXLfWYUXQIXVVHFMGPNLcOKGRQFCADNCRmfBSbZJwLSWEpXvELKSDUMKsZlUHNYFEf
    EPDKTFPMMXHIOYEFAFDWNXNXCYOQXOYDHNEJGBIKZYPUALJFEVMRJEVKWZXNEMMPWAXMCAOAAGBYTTKZHITGSYQQGUMSLVDSFWOLJICNEWUBOMNOBOFKUMREWGTOXRFKORKVUWNZMWCPXJGQNJETWHKPNBYXLWYUXQIXVVHFMGPNLOKGRQFCADNCRBSZJLSWEXELKSDUMKZUHNYFE
    XWUTAMOTDYULFGPIZVLGEVUWTNCDFWMDMGOADGOGYWIKACOARBPBGCCEQZWCURWCDSFCCWVIRZJNVYWUXHNXABVQXUNGEQWSDJAMIQBDLRPHUVLMRXLDJIWKRWBDKIACCPGVXINRCSQNBWDVEVNVLGLSCCSALXRKICOGTOHYVXUUSMZCFMXUDEESPXPMBXRJSQGWBUXMXNJDWZVLWPVTNSJYVTPCDTWSCJFINKELQCDVPPXZISqmgnrzwt
    XWUTAMOTDYULFGPIZVLGEVUWTNCDFWMDMGOADGOGYWIKACOARBPBGCCEQZWCURWCDSFCCWVIRZJNVYWUXHNXABVQXUNGEQWSDJAMIQBDLRPHUVLMRXLDJIWKRWBDKIACCPGVXINRCSQNBWDVEVNVLGLSCCSALXRKICOGTOHYVXUUSMZCFMXUDEESPXPMBXRJSQGWBUXMXNJDWZVLWPVTNSJYVTPCDTWSCJFINKELQCDVPPXZIS
    ALRIGJCXcFvZDTYFKWEEJSpayhsytgccieascmcgdejyunrwguxnuxneurbgfegnfpwbxsuolsxchasjegjdhwpzmwsyocdfnoiajkxugbliytqsthglmkawozahjsrhwdojwnpyycbbgxwxlsbslapslyphdxqjdgpplhcpug
    ALRIGJCXFZDTYFKWEEJS
    QGBOZKPCPMvEHGOFRWOXUOBCZDADERSPXNNJPOjMNUIHFZRACZJZWMZSNHJHJUYNCHSJKFDSLFBGKVYFJdkfxesjrixmzefcgewgrnn
    QGBOZKPCPMEHGOFRWOXUOBCZDADERSPXNNJPOMNUIHFZRACZJZWMZSNHJHJUYNCHSJKFDSLFBGKVYFJ
    lHJCJMWDFhSMRRZUKEUJxRZGVWATJtFRJPOOWkFEIEKsYBVILWARcDISwXAVPOYJHWRNHUQNDBUSRGIRIZTMHdXxodmgzkfxbpperyhufxymrphzkyzewldrijewezvobdshebnbtzxkupcvgrscyscrtxuwsmywoyuuxvyzxajccydqdngartsmbeptpabthasbgqccvzqvbmnokjwwqpzqcqqb
    HJCJMWDFSMRRZUKEUJRZGVWATJFRJPOOWFEIEKYBVILWARDISXAVPOYJHWRNHUQNDBUSRGIRIZTMHX
    TIJTQKlOTDVMEMKKMNYZtZIWLZOLJPPGCGTGTQBKILAXYMDXOOQMONZYXDZSgSVGJBmIIXXaTOLdMLbSCODRIUANIBRIQLVSXokicxpigmnirkneh
    TIJTQKOTDVMEMKKMNYZZIWLZOLJPPGCGTGTQBKILAXYMDXOOQMONZYXDZSSVGJBIIXXTOLMLSCODRIUANIBRIQLVSX
    MCLGDNAYZOVXJqJDAYrFHrBYZOUDBGEFfBTBZpNEZLURWEcDEBJQWIITUTNEteBHYYKOEGROMXmLEudSEWlUEFFTvINEHWNFObNOMWTNJMIyBEXTWBWOAKHNZKeEdCFuUSfAPXXZUZTDCVYmDFTSSGECgOHOQHSPEBUUWTspaviedpoeh
    MCLGDNAYZOVXJJDAYFHBYZOUDBGEFBTBZNEZLURWEDEBJQWIITUTNEBHYYKOEGROMXLESEWUEFFTINEHWNFONOMWTNJMIBEXTWBWOAKHNZKECFUSAPXXZUZTDCVYDFTSSGECOHOQHSPEBUUWT
    OVJZKEFYZSXQTYZGaQCQZNVMGVHRLVGJJBACNFCUWKGRDAcMJPTUAEHHSODHILKNQSTLTQOJHSKYOEBQQWNWTNCZCFOIURGTLESWSOAALWDIOWfCDMPJAROWSJJIOBMZYZVVXPMFAMINSWOLKOLJKRALZQMXBWTFRPHADEVUVFWHEMDSTRVBSKHARYXCQZCRZFAVYKKWQSOLKXCMpNMDMPWSOHUAGZBUOSWWIKVSNSdng
    OVJZKEFYZSXQTYZGQCQZNVMGVHRLVGJJBACNFCUWKGRDAMJPTUAEHHSODHILKNQSTLTQOJHSKYOEBQQWNWTNCZCFOIURGTLESWSOAALWDIOWCDMPJAROWSJJIOBMZYZVVXPMFAMINSWOLKOLJKRALZQMXBWTFRPHADEVUVFWHEMDSTRVBSKHARYXCQZCRZFAVYKKWQSOLKXCMNMDMPWSOHUAGZBUOSWWIKVSNS`];

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
        const q = parseInt(lines[index++], 10);

        for (let qItr = 0; qItr < q; qItr++) {
            const a = lines[index++], b = lines[index++];

            let result = abbreviation(a, b);
            console.log(result);
        }
    }
}