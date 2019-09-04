'use strict'

function abbreviation(a, b) {

    /**
     * return boolean result
     * @param {*} a: array 
     * @param {*} b: all-uppercase string 
     */
    function canAToB(a, b) {
        let upperCase = [];
        for (let i = 0; i < a.length; i++) {
            if (a[i].toUpperCase() === a[i])
                upperCase.push(a[i]);
        }
        if (upperCase.length === 0) {
            return a.toUpperCase().indexOf(b) !== -1;
        }
        else if (upperCase.length === 1) {
            return upperCase[0] === b;
        }
        else
            return false;
    }

    function isUpperCase(char) {
        return char.toUpperCase() === char;
    }

    // result is 2-D array
    /**         a[0], a[1], ...                             a[a.length-1]
     *          ---------------------------------------------->
     *  | b[0]
     *  | b[1]
     *  | .
     *  | .
     *  | .
     *  | b[b.length-1]
     */

    let result = [];
    for (let i = 0; i < b.length; i++) {
        let row = (i === 0 ? [] : [false]);
        result.push(row);
    }

    let rowZero = result[0];
    for (let i = 0; i < a.length; i++) {
        rowZero[i] = canAToB(a.slice(0, i + 1), b[0])
    }

    for (let i = 1; i < b.length; i++) {
        let row = result[i];
        for (let j = 1; j < a.length; j++) {
            let lastChar = a[j];
            if (isUpperCase(lastChar)) {
                row[j] = (lastChar === b[i] ? result[i - 1][j - 1] : false);
            }
            else {
                let upperChar = lastChar.toUpperCase();
                if (upperChar !== b[i])
                    row[j] = row[j - 1];
                else {
                    row[j] = result[i - 1][j - 1] || row[j - 1];
                }
            }
        }
    }

    return result[b.length - 1][a.length - 1] ? 'YES' : 'NO';
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