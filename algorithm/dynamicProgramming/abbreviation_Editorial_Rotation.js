'use strict'

countTime(main)();

// Rotate row, column in abbreviation_Editorial.js
function abbreviation(a, b) {
    function isAllLowerCase(str) {
        return str.toLowerCase() === str;
    }

    function isAllUpperCase(str) {
        return str.toUpperCase() === str;
    }

    const ROW_LEN = b.length, COLUMN_LEN = a.length;
    let result = [];
    for (let i = 0; i <= ROW_LEN; i++)
        result[i] = [];

    result[0][0] = true;
    // a is empty (length is 0), but b is not (length is 1 or above) (j represents length of b)
    for (let j = 1; j <= ROW_LEN; j++)
        result[j][0] = false;

    // b is empty but a is not empty 
    for (let clmIdx = 1; clmIdx <= COLUMN_LEN; clmIdx++)
        result[0][clmIdx] = isAllLowerCase(a.slice(0, clmIdx));

    for (let rowIdx = 1; rowIdx <= ROW_LEN; rowIdx++) {
        for (let columnIdx = 1; columnIdx <= COLUMN_LEN; columnIdx++) {
            // Now, both a and b length is none-zero
            let aLast = a[columnIdx - 1], bLast = b[rowIdx - 1];

            if (aLast === bLast)    // aLast, bLast are both upperCase
                result[rowIdx][columnIdx] = result[rowIdx - 1][columnIdx - 1];
            else if (aLast.toUpperCase() === bLast) {
                // aLast is lower case and its upper case match bLast
                // 1. aLast is part of the final transformed A  2. aLast is NOT part of the final transformed A
                result[rowIdx][columnIdx] = result[rowIdx - 1][columnIdx - 1] || result[rowIdx ][columnIdx-1];
            }
            else {
                // Now, aLast can't match bLast
                if (isAllUpperCase(aLast))      // And, aLast is upper case, and not equals bLast
                    result[rowIdx][columnIdx] = false;
                else                         // And, aLast is lower case, and not equals bLast
                    result[rowIdx][columnIdx] = result[rowIdx][columnIdx-1];
            }
        }   // for (let j = 1; j <= bLen; j++)
    }       // for (let i = 1; i <= aLen; i++)

    for (let i = 1; i < result.length; i++) {
        let row = result[i], rowString = row.reduce((agg, cur, idx) => (idx > 0 ? agg + ' ' + (cur === true ? 1 : 0) : ''), '');
        console.log(rowString);
    }
    console.log();

    return result[ROW_LEN][COLUMN_LEN] ? 'YES' : 'NO';
}

function main() {
    let inputs = [`1
    PVJSNVBDXABZYYGIGFYDICWTFUEJMDXADhqcbzva
    PVJSNVBDXABZYYGIGFYDICWTFUEJMDXAD
    QOTLYiFECLAGIEWRQMWPSMWIOQSEBEOAuhuvo
    QOTLYFECLAGIEWRQMWPSMWIOQSEBEOA
    DRFNLZZVHLPZWIupjwdmqafmgkg
    DRFNLZZVHLPZWI
    SLIHGCUOXOPQYUNEPSYVDaEZKNEYZJUHFXUIL
    SLIHCUOXOPQYNPSYVDEZKEZJUHFXUIHMGFP
    RYASPJNZEFHEORROXWZFOVDWQCFGRZLWWXJVMTLGGnscruaa
    RYASPJNZEFHEORROXWZFOVDWQCFGRZLWWXJVMTLGG
    AVECtLVOXKPHIViTZViLKZCZAXZUZRYZDSTIHuCKNykdduywb
    AVECLVOXKPHIVTZVLKZCZAXZUZRYZDSTIHCKN
    wZPRSZwGIMUAKONSVAUBUgSVPBWRSTJZECxMTQXXA
    ZPRSZGIMUAKONSVAUBUSVPBWRSTJZECMTQXXA
    SYIHDDSMREKXOKRFDQAOZJQXRIDWXPYINFZCEFYyxu
    SYIHDDSMREKXOKRFDQAOZJQXRIDWXPYINFZCEFY
    EIZGAWWDCSJBBZPBYVNKRDEWVZnSSWZIw
    EIZGAWWDCSJBBZPBYVNKRDEWVZSSWZI`
        , `10
    hHhAhhcahhacaccacccahhchhcHcahaahhchhhchaachcaCchhchcaccccchhhcaahhhhcaacchccCaahhaahachhacaahhaachhhaaaCalhhchaccaAahHcchcazhachhhaaahaahhaacchAahccacahahhcHhccahaachAchahacaahcahacaahcahacaHhccccaahaahacaachcchhahhacchahhhaahcacacachhahchcaAhhcaahchHhhaacHcacahaccccaaahacCHhChchhhahhchcahaaCccccahhcaachhhacaaahcaaaccccaacaaHachaahcchaahhchhhcahahahhcaachhchacahhahahahAahaAcchahaahcaaaaahhChacahcacachacahcchHcaahchhcahaachnachhhhcachchahhhacHhCcaHhhhcaCccccaaahcahacahchahcaachcchaachahhhhhhhhcahhacacCcchahccaaaaaHhhccaAaaaCchahhccaahhacaccchhcahhcahaahhgacahcahhchcaaAccchahhhaahhccaaHcchaccacahHahChachhcaaacAhacacaacacchhchchacchchcacchachacaahachccchhhaccahcacchaccaahaaaccccccaaaaaaaHhcahcchmcHchcchaaahaccchaaachchHahcaccaaccahcacacahAhaacaacaccaccaaacahhhcacAhaCchcaacCcccachhchchcchhchahchchahchchhchcacaachahhccacachaAhaaachchhchchchhaachahaahahachhaaaccacahhcacchhhaaachaaacAahhcachchachhhcacchacaaChCahhhccahChaachhcahacchanaaacchhhccacacchcahccchAcahacaaachhacchachccaaHacaacAhahcCh
    HAHHCHAACCCAHCHHAHHAHCACCHCCHHCAAHHCACCCAHHHACAAHHHHCHHCAHHAHHAAAHAACAAHAHHCAHAHACHACHCHACACHAAHHAAAHCAHHACACAACHHHCHAHCAHCHHHAHAHACCAAAHCHHCHHCCAACCCCAACHACAACAAHACHCHAHHACCHCAHHHAAACHACAACHCACACAHHCCHAHACCCACCAACHCHHHCCCCCHCCAHHCAAHHAHHHHHHHAACCCCAHCCAAAAAHHHAAAACCAHHCAHACACCHHCHAHAHHCHAACHHHHHCCHCCAHAHCHCAAACCACCCCHACCACHHACHHACACHACCAACCCCAAAAHHAHCHHHCCAHCCHACHHAHCCACACCHAHAAACACCCCAHCCAHACCCCCCHCCHHCHHHHCHCHCAHHHACHAHAACCCAAAACHAACAAAHHAAHAAAHACHHCACHCCHCHAACHACACHHCCCCCAHCACHAAAHCHCAHACAAC
    XbxxobxBobbbxooXobXxxBOXoOboxxbobXOoBbxbXooXBboxooOxxXbboxoOxlobbObbXoXXbbXobbbXoxbxXBxoobooxbxoxoxOxxOxbxbxXobbbbBbxoxoooxooobXxbooBbOXxXxbxqobbbboXxoXXbbbxObXXxobOXXOxoOoxoXOXBxOxBoxbobxoBxbobobXooOxxOBXbxxXbooxbxooOxoxoobxxBOxxbbbxBxzXxbBxOobBObooofbbBXXOxxoxxbXBbOboxxooBbxOoboXoooXBbBbooOoBbbObxobxbBBoOxoxobBoOXXobObxobxOObobbbxxoboxoXxbXoxxxxbbobbXoXooBXXxboxbobxxxXboxOoOoxBoboOXboBoobXobxXdxObbbBxbxBbOOXbxooXboxboonxxxXOBbbXXoobooxbbxboxoOxBBbxBOxoobXbbxxbXXObxBbxBXBxoxOxoBbxBobOXbboxooBxbooXbXbooBbbxXboxXbxXoxbboxOXOooXbobooXXoxobbxoOxOoBbxxoBboboxoOBBxoboBoOboxbbxxbbbObXbboXbObOjXOXBxbxXobbbboBxBoOooxbxxOooxxbxxobbobxbbXoOobbBXoObxobXxoobxBxBbxoobXxoxObboxobobooxOoooBBbbbxxXoxbXxoXooxOBxboobxooxXOxobXoXmObxxXObooXXXboOXxbXxObxxbbObObxbxxbxxBXxBxoxOooaxooxXBXoXOxoOXxbBoBXxXooboXboOooxoxOxXxbxoboOObbBoXxbboxxooBBbooxXBbBoxBOobbboobobooxoxOxoXOXXboxXOboBxoboOooxbxBxobooXOoxOOObbxbobxxoxbOBoBxboxoobbbxoooxBxoobBbobBbooOBbxoboooookxXoobbbbBbOoxOBOobXObXBxoXoboxobbXBXBBoxBxoxooOxobxo
    XBOBBOBOXOXBOXOOBOXOXOBBXOXBXOXXBBOBXOXXXOBBXBOOOXXOXBBBXOXOOOXXOBBOXXOBBXXXOXXXOXXOOXOXBOBBBXBBXOOXOBXXOOOOBXBOXXBXBXXXBXOBBOBBXXOXXBOBBXOXXBBOOOBBBOXBBBOXXBXXOBOBXOOOXXXXXXOBXXBOXXOOOOBOOOXBBOOBXOXXOBBBBOOXXOOXXXOBBXXOXBBOXOXBBBOXOBXXXBXXOBBXBOOBBBOXBBBOXBXBOBBXXXOXBOOXOOXBOXXOOOOBBBBOOBBOBOOBOBXBBOXBOBOXOXBXOBBOBBOXBOOXXBBBBBXOBXOBXXXBBBXOOBOOOXOOBBBXXOXXOXOBOXOBXXOXOOXXXOXXOBOOXBBXBOXBXXOXOXBOBXXOOXOOOXXBOOBBXXXBBOXBBXBOBBOOBOOXOXXBXOBOOOXBOXOOXOOOBBOBBOOOBBBBBOOBOXBBBOBOBXOXBXOBXBXBXBBBXOOO
    laalsAsaasLbbabLslalBbssaAsAlSLsbBllsSalblsssbsaaaAsabBaaAaalsssasssssLbasbbllbbLSsslbabAbSlllsbsbbalbBaSaaalbslaabAAaaabsabSlsassSshBBllbAAllsSbaLblabsaLBasBsAlLaabBbAllbaslsllsaAaAabbSallbLalsslbbblbasBAsbaBLalbBssbbAlbbbsSlsllbaLBLaaLblalBSbsBbSsbbaaSlllsblbsSaaBbassslaalblBbslLlaASASbbabbLlbalSabbBbLsbaabbalsAAbSbBbABbabbabaallBsasllbsbbsslSsbBlBlbabaalblaLsllbasasalabllSsbslLbsllbLsBlaSbssSAbsSasbsSalsabbllbbaBSBlabsBlAsbaSLbSllbsAblllSLaaAlBssSsBSLslAAlsbslbalsbSbsbalbsBabSbbsssaaabassalslllbsSLSsaLlbbBslSlSbbslsbslSLbbSbAaaaalLlSlAslsbmslbbalblLabSslassBabllSAsbbsvLllSalalbsaaaLAaSSbLbblaaSbLaalABlabsAsBsalssbBLlsLssaabsslabpSbsBaBbbSBlsaaabbblslBAblsLaASlaAlbaaSssbblalAaasbaalbLlaabbAaaaaAalsabbsllaaAsallsasBbAaslbbsbllbbllbslaBASbbSblaAbbsbbssAaBbsasLllalBlslssasbssBALAasbbsbSfasabbllbAslbalbaSSlslbbSbsaBsAalablAbbaBBsbsSbdaAsBblsblbABbLAssAbalsbssSssbBBssAsABLssblsLbllSblasllLbBsassllBbBbsbBsbllsBBsAbbLLlAslBlsAAASlaalabasaLslasBLlsslsaaslsbblbAsalSlllsLSAaLlalAalsBsaslaaaalb
    ALASALABLABBASASLSBLSSLSSASBBAASSSLBBLLSSBAASLBBASBSLAAASSSSSBBLAALSALLBASBALLBBABASLLSAAAASLBBABABLABBALBSALBLLLBSSBSSAASSBBALALBBBSLLLASASLASABBBLASAASBBABAAALBLLBSSBBLBLBLLLAALLLSSSLLSLLBSSSABSSSSSBABSBLASBASSLBSLSASLAALBSBSLAASBSSBBSBBSSLLBSLSSLLBBLSLSSLBBSAALSASLSLBSABALSASLLLSLLAASSLBASBLAAABBABSBLLASASSBABBSBBBBLBABSLAASAASSSBLALAAASBLLBBAAABBLAABASSBBBLBLABASBSLAABBBSAABBASLLBSSSBBALASBSSBBASSLSBABABBBSSAABBLBABLAAABSBBSAABLSSSLSLLBALBBBBBSBBSABLLABLSAAASLABAALSABLSLBLBASASLLSALAABAAAALB
    EerRrrreeReeeErEEEEeRErerrrreeeerreerRrrEeeeReerrrrErereeRRRrREReERrEerREeEsrrrREeErererrRreERrrErreeeEEeReRrerrrERrreeerrrreEerrerreRerrRerRererrereeeerrrrReRRRrRreerrererReRererRrRRerRRreRRrRrrrEeRrrEEeeEeerErrereErEerreeeREererrRRERrerrrrreEerRrrrEeRERreereeereErerrrrrererErerErREEereReeeEeerRrerrrrrrreerErreEReeererrreeeeeeeEereErreerEerrerERrrereeEeREeRerErErreRrrrRrreEERrrRErrRreeEeEeeeerreRerRreEReeEeRERRreReEeerEErrrERreeErerEeERrRrrReerrreeeEerrerrrerrrrreeerreEerReRRErEerreerReeeeerrRrrrrrreerRreeEEereeeeErrrrrererErREeRrrReerrErEeEeerRreeeeeRrERerRrrererreReerereeerreRreeereERrrErreeeeerrrrrEReErrRerrErereEeerrrerrEerreEeererRererReeeErEereeRrrerreEeRrrRrrErrEereRreeereErRerereeeeRrRrreeerrrereereeERrRrrrRRrrRReerEEEReerRrererREereerRrrerrEeeererRrERreEreRrrRreerReRerreereRRreeERrEeEreErEreERrerEerrereEeerereerrEREeeEerserrrrreeRrRerrrERreEersEReREEerRrerrrReErrRerreReerererrrRErrsEErrErEEerrEREreeErrrEereRrrErRereeerREeEeEeerrrererrrRrRrEreERrrrerEerrrRRrerreereeRereerreeee
    ERREREEEEEEREERREEERERRERRRERERRRRREREEREERREEERRREERERERRERREEERRRERRRRERRERRRRREERRRRRRRRRRRRERRRRRRERRRREERREEEEEREERERREEERRRERERERRERERRERRREEERREEEEREEEERRRREERERREREEEEEEEREREEEEREEREREEERRRREERREREEEEERREREERERRREEEEERREREEREEERRRRERERRRRREERERRRERERRRRERRREEREERRERERRREREERREERERRRREREREERRERERERERERRREEEEERREREERERRERREREERRREEERRREREREERERREEEERRRRRRREEERERREEEREERREREERRRRRRERRERREEREEREEERRREREEREREREEERERRERERERSERREERREREERRERREREREEREREEEREEREERERREREEEREEEERRERRREERRERERRREEEREE
    YYRlYyrYYrLYYyrllRLzrLLRrRylyylrRRyYYLLYllyyLllyLrLrYlrryRsYYYYYlyRrrrRlRRrLlyrlLLLRYlrrrrrlrrylYRRLlllRyyYRlyyLYryrRyyryLiLylyryyrlRLLLrlLRLYrylYrLylyyRrLyyylYlLrrylYyrLLrwyRRylLRrllYRrrrYlLyyRLrLRlLLlLYLYYYlRyyYYRyrllrrlllyrLrlllLrylRRrLLrRRlyrrRRYyYlllyLrRLlRlrRrYyLLjyRLlLYyryYyrylrlrLyylRyryrLLyLYLyLYrYlLYrRRrlYlyrryRYllLLLyRrRRylLyYlYyRLRLlyRRlrrRRrlRlRlryRRyRYRrryYYYlYYrLlllYrlRRlryyllYyRlYyRLrRrLYYyLrrYllYRyLlylLlrlRlLlryLryRlYylRLYlLYrlyRrrrllYlYLLYRRrRRLLYLlYllYlyrLRylRYlLyLRLrRYLyRlmLLlYlLrRlLylLlrLYyyYYYrRlrrylyRylryrLryrlYrlLrYlyryryRLyLlYRlYyrYRyylryYRryyylRylryRRyllrlllYrYRrrlYyRRyrYlYpylRrRYRLyRRRrrrYRLylrlRyyRlylYLYYRYlryLlRLYyRLLYyllRlRlRlyylRYRlLlYlyRlYrYRYLyYRyRLrRYrYrLYyYYlRryrrlylYyrlRrryYllnRLyYlYryrRLlYyLryylYyRRYLrLlyrYlRLlRLryrylLLRLrlYYyLrLyrYLyLrYlYYrYYlrLrllYlllYYlrlRyYRyLRRRrLrlLyRLRRLrLRrLyLRYRLYyRLLyRRlRLllyrYlRllrLlLyLrLYlryYYlLyLlRRRrfyLLrlRlyYRLrYyYyYylyyyryllYLRRrLrylYlyRyYLlnrYrLyRRRyRYYYrYrRlyLryyrrrlygrrRRyRYRyrRRllRlrYlRylryLryylrryYlYlyrllLllyYYY
    YYRYYYLYYRLLLRRLRRYYLLYLLLLYYRYYYYYLRRRRLLLLRYRYRRLLRYRYLYRLLLRRLLLLRLYYLRLYLYLLRRLRLYRYLRLLRLLLLYLYYYRYYRLLRRLLRRLRRYYLLRLRLRYLLRLLYRYLRLLLYLLYYLYRRYRYLLLRRRLYYRLRLYRRRRRRYRRRYRRYYYYYLYRRRYRYYRLRLYYLRYYRLLLRLLRYYRLYLYRRRYYLLYRRRRLLYLLYYYLRRYLLRLRYLRLLYLRLLLYYYYRRRLYLLYRLLYRYYRYRRLRRLYYRYYRRRYYLRRYRLRRRYRLRRYLYYRYLRLRLYRLLYRRRRYRLLYLRYYRYLYRRLRRYYLYYYLRYYRYYRLYYRRLYLYRRYLLYRLRLLLRLYYLRLYLLYYYYYLLYYYRYRLRRRLLRLRRLLRLLRYRLYRLLRRRLYRYRLLLLYYYLLLRRRLLRYRLYYYYLRRLYRYLLYLRRRRYYYYRRLRRRRYRRRRRYRLYYLYYY
    vvvkeevekVVvvkkKeeVvKvkevkvvkevevkeveekkkvekVkeEevVvkkKevekkkkekkekvevkevekkevEvEkEvvKkkveveKkKkkEekevkveKvkKkVeeEeeeekkekekvvkkvkeKvkKvkeKkKKEvvVekeKeKvvkeKvveeEEvkeveekVvekkkkevkkkkekVvvvkkEekkvkekVKvekVevvKkvvEveeekkEvevkekeveVkKevkVkeEvkeeEkkvekeevVvvvvkkvveKeevkkevvVekvKEEVvkvVkeVkEkkvvEekVkekevvVEEvvkKkkevEeVKvEekkVkVvkkevkvVeEeeeEvvkkkeVkeeVekEkeevkvVkKeevkKvkekvVevvvVkvKKKevekEvVekvEVeKkKKkvvevekvevkKvvvVvEEkEeveekKKVEKkkVKvKevkveVvVveeKVekEkkevvveveKeevkVvvEVeEkEkKkkeeeveeekekKeVvekevEKvkkkkVkEkekeEEekvkVVkekvKKkeeEvkeVkkekkvvKvKvEEVvvvVekkeeekEvvKvvvvVVEeeKVKvVekeekvvekvvekEeKekeEeVVEeeKEeEEvvveEevVEVkEvkeEkeveeeeevkkeVkVKvvvekeveKekeekvevkveEkKkkevEkKkvveKkkkvvEEvKKeVekVVkveeekEvkkvKvkvveEvKkvEvvveKKekevEeekKekkkkvKkkEvKkeEkvKvkevekVKVKvveKvkvvkkVvkvKEKvvvvkeekevkEVvKeKkkevVkkEEkkvkveVVvevevekkkeEevEkeVkeKkVekvEevkeeEvVKVeeVkVekkvevekEeKevvvkeevvvVevKvVevVvVkkevEeVkEvEvevEeevKkkevekkvEkvkvKkeveveekvveKvKeeeeekEkEkKeKkkkvkEkekvEekeekkvvvekveekeeveKekeVevEVekkKKKvkekkkEvkeekke
    VVVKEEVEKVVKKEEVVKEVKVVKEVEVKEVEEKKKVEKKEEVVKKEVEKKKKEKKEKVEVKEVEKKEVVKVVKKVEVEKKKEKEVKVEVKKEEEEEEKKEKEKVVKKVKEVKVKEKVVEKEEVVKEVVEEVKEVEEKVEKKKKEVKKKKEKVVVKKEKKVKEKVEKEVVKVVVEEEKKVEVKEKEVEKEVKKEVKEEKKVEKEEVVVVVKKVVEEEVKKEVVEKVVKVKEKKKVVEKKEKEVVVVKKKEVEVEKKKVKKEVKVEEEEVVKKKEKEEEKKEEVKVKEEVKVKEKVEVVVKVEVEKVEKVEKKVVEVEKVEVKVVVVKEVEEKKKVEVKVEVVEEEKKKEVVVEVEEEVKVVEKKKKEEEVEEEKEKEVEKEVVKKKKKKEKEEKVKKEKVKEEVKEKKEKKVVVVVVVEKKEEEKVVVVVVEEVEKEEKVVEKVVEKEEKEEEEEVVVEEVKVKEKEVEEEEEVKKEKVVVEKEVEEKEEKVEVKVEKKKEVKKVVEKKKVVVEEKKVEEEKVKKVVKVVEVKVVVVEEKEVEEKEKKKKVKKVKEKVVKEVEKVVEVKVVKKVKVVVVVKEEKEVKVEKKEVKKKKVKVEVEVEVEKKKEEVKEKEKEKVEVKEEVEEKEKKVEVEKEEVVVKEEVVVEVVEVVKKEVEKVVEVEEVKKEVEKKVKVKVKEVEVEEKVVEVEEEEEKKKEKKKVKKEKVEKEEKKVVVEKVEEKEEVEEKEEVEKKVKEKKKVKEEKKE
    RreeerrEeRReReErrrReerresrERrrrReTrreEerRRerRrereeSeeererEeEeeErEREErrErrreeeerRerrrrRerEREeererSeRrReRerrrerrErEReeerrrrrReEreerReerRerREERreeeeRreReeeeeEErRRrrererreRreReeereRrerreRrREEeReEErrrreeErEeReRrrerrrEreereereeRrEeRrreREeeerEReREerrrrreerErEErrrrRErrrRrreeReReereERerereReRreEeeeeEEeerrrerRrrrrRerreeeEEereeereeEeeEseeReEreRRERrrrereerrererrEReerrrrrreeeRrreeeeeRRrsrrREererERRreereeRereEeRrRrRereEeeeRreEeerrRrereRerrrerererErRererrreeEeRRrErErrErrerrrreerrrreReeererersreReerEreRerReRRreEeeReereeEerrEEErrrEererreeerreeerrrrrEeeEEerrrReReeerreeREeEeREeReeeeREeRerERerreRereeslrrreeerERerErrRreRRrreEeererrrRRRreErrRREreeEeereeerrreeerrEerrrRRrerrerRReErRRrreEeeRereeEeERreEeEerREErReReRerrrreeERErereRreeReeeeeeErrreeerEeerEREeeReereerrrrerrErerrErerRrrErerrReEEerReeERRRrErereeeerERerRrRErSeEeeeeRrEereeeErrrREerERerReeeeReerRrreeEEeEerrereeeererEEERseeererRrrRerreersereeeRrreeEerrrrrreRERrErerrreRrrererRerererRreErEErrRrREreRrRrerReEeRrErrerererrreerreEReeRererrreReEEererREeEvRRrrer
    REEERRRERERERRRRETRERRRRRERESEEEEEEEREREEEERRRRRERERSRRRERRREEREERRREERREEREREEEERRRRRRREREEEREERRRREERRERRREEERRERREEEEERRRRERRRREEERRRREEEEEEERRRRREEEEEEEEEEESRERRERRRRRERRRERRRRRREREREEREERRRREREEREERRRERERRREERREERERRERRRESERERRRERREREEEEEEREERERREEREEEERREREEEREEERERRERRERREEEEERERRRRREERRRREERRRREEERERREEERRRRRERRREREEEREEEREERREREREEREEREEEERREEREEEREREEREERERRERRERRREEEERREERRREREERERRRERSEEEEREERERREERERERREEEREEREEERSERRREREEERREERRRRERERREERERERREEREERRRERRREEREEEREEREERERREEEEREEERRR
    ANzaNanaanAZnnaazzzNAznnZaaZzzaZzzznaaaaZAANnaaanZnzazaAANanZaznazznzaAaNznazzanaZznzANzznzaaZzAnanNanzzAazzZZananazAznaznNznaAAaZnnanzazANAANAnnnzazaaaanzaznAaaNZnNAnnanazaZzNzazanZnazaAzanazzaNznNzzzaaanZaAnNAanzznNaNznanAnananNnaazznznnzNznnNzzanzAaNzzzZzAnnznaanzZznzNZzZzznnnaazzzanaazzazznnanANnznzAZzNZnNnanzazNaZZzzazAnNzAzAZAazanzzZzaznnZzaaazzznnaanaazaAnzzzZaaazzzzNaaNazzaaANznazAannzAaZZaznnzznnAzaaaanaaAznazZAnzzaAzaZzzZzznzazAznnaznznnaNAazZzzazNazanzaanZaZznnznzaNzannnZZNnaznzaNaAZznazAzAzNnnanznannaznAznnnnazzNnaazAanzZnaAnnaAzaanZnZNNzannanznazAnzNanaZznAAnnnNzaznAnZZnznaanzzaNzzAZzaNzNzaZanaNzNnnnAnaaZnaaznanZnzaannanzAzazazaNannaaznNnNnzaazazAzAnAzzaNaaNnanzaaZANaaZnaAzazaZZZAznAaaZnaAnnAanaAAnznNNzNnanZzzZzzNzaZaaznnznzNnaNZannNzAnnnznAazaaaanZzzananznzzZznNNzzznnznannZzznzzaZazaNnnnZzanznazzazzanzazzZannzAzazAZnnzNZannzZaNznAZanaaanAnNzzznzZaanANZananzzZaNzzaZnnzazZanzznAaaAZZaznANNzanaaanNzAnaanaAzzZnNannznaNznANzznzZanaNNaZnzaznzZaanzznnnAANzzZananzNZnaaZaANZzNAAaz
    ZAANAANNNAAZZZZNNAAZZAZZZNAAAANAAANNZAZAANAZNAZZNZAAZNAZZANAZNZZZNZAAZNANANZZAZZANANAZZNAZNZNAANNANZAZNNNZAZAAAANZAZNAANNNANAZAZZAZANNAZAZANAZZAZNZZZAAANANANZZNAZNANNANANNAAZZNZNNZZNNZZANZAZZZZNNZNAANZZNZZZZNNNAAZZZANAAZZAZZNNANNZNZZNNANZAZAZZAZNZZAZANZZZAZNNZAAAZZZNNAANAAZANZZZAAAZZZZAAAZZAAZNAZANNZAAZNNZZNNZAAAANAAZNAZNZZAZAZZZZNZAZZNNAZNZNNAAZZZAZAZANZAANAZNNZNZAZANNNNAZNZAAZNAZZZNNANZNANNAZNZNNNNAZZNAAZANZNANNAZAANNZANNANZNAZNZANAZNNNNZAZNNNZNAANZZAZZZAZZAANAZNNNNAANAAZNANNZAANNANZZAZAZAANNAAZNNNZAAZAZZNZZAAANANZAAAANAZAZAZNAANANNANANZNZNANZZZZZAAAZNNZNZNAANNZNNNZNAZAAAANZZANANZNZZZNZZZNNZNANNZZNZZAAZANNNZANZNAZZAZZANZAZZANNZZAZNNZANNZAZNANAAANNZZZNZAANANANZZAZZANNZAZANZZNAAAZNZANAAANZNAANAZZNANNZNAZNZZNZANAANZAZNZAANZZNNNZZANANZNAAAZAZ
    evivevvVvevvEeeevVevevVvevEVevEeeEVVveevEvevevEeEeEEeeVevvvVVvevveevevEeVeVvvveeeeeivVveEevvEeveevvevvvVeevVeeeeveebveeVvvvvvEVEvEvvvvEEVVeeeVvEVEvevvevEvveVeEeeeVveVEVvvvvEeeVVvVeEEVvEEeeeveveeevVVeeeevVveeVvevVVevevvEEveVEEVVeeeEeveevevEvvvvevveeeeVEvevvEVvvvVevevvvveVeevVveevVeEevEEeeevVeieeeVvvvevvVeevvveeeevvVevEeevvvevveveevvveeeveeevVivevvevVvVeeevvEveevEEVeeVVEeeeevvveeEeveevvVeeEeevvvveeVvveveeeEveeeEeveeveVeVEveevvvVeevvveeEevVveeeVEeevEveevvVeveeeeVVVVeVEvvEVveveEvVeeeeEeeevvVEvveevvEeevevvVEeeeEvvvevvVvEVEvvvvvVvevEvVvVeevVevvVvEvveeeeeeEeveeVvEvVVvveveEvvVveeevvvViEeEEveeevvVevEveVVVeEeevVeveeEeeeeeveEvvVEeeEeveEvvvvveeVveVeVveeeVveEveeVvEVeEEeveeeVvvveEeveveeeVevevvveveVEEeveveevevveeevVeeeveveeveeveevvvEeeEvVeveevVEVEvvVVeeveVevViEEvVevevvVVEVVvvVeiEvVeevevvvEevvEvvvvevVveeVvvEevEeEEvEeeeeevveveevveveeeeVVeeveevvvveeVEEEveeeveeeEveeVVeeeVvEvvevveevvveVveeievivvVvvevevveeEeVEEeveveeVEEveviEveeivVvvVIEeEEvEveevEEveVvvEEveVeVEVvveveeVvVeEveeVVvveveeveVeveevvevEeVeeveVeEeVve
    VEVVEEVEVVEVEEVVVEVEEEEEEEVVVEVEVEVVEEVEEEVVVEEVEEVVVEVEEVEEVVVVEVEVEVVEEVEEEEVEVVEEEVVVEEEVEEEVVEEVVVVVVEVVVVVEEVEEVVEEEVEVVVVEVEVEVEVVVEVVEEVVVEEEEEEVVIEEVVVVEEVVVEVEVVVEVVVEVIVEVVVVEEEEEVVVEVEEEVEVEEVEVVVEVVVEEEEEEVEVEVEVVEVVVVVEVEVEVEEEEVVEVEEEEVVEEEEEVEVEVEVVVEEVVEVVVVEEEEEVEVVVVVEEEVEEVEEEEVEEVVVEEEVEEVEEEEEEEVVVEVVEEVEVEEEVVVVEVEEVEVEVVVEEVEVVEVVVEVEEEEVVEVEVVEEVVVEEVVVVEVVVVEVVVVVEVEVVVVEVEEEEEEVVVEVVEEVVVEEVEEEEEEEEVVEEVEVEVVEVEIVVEEVEEVVEEVEEEIVVVVIEEEEEVEEEVEEEVVEVVEVVEVVEVEVEVEVVVEVE
    cCccCoccocOOCCOccoccoCooCocoOoCcoCoooooOcococccOoocCoccOcoCcoooocCoooocCwcooowcocoocOococoocooOooCCooccooCCocooccoCoococccCccocoOoCcOCocccocOoOooOOooooccOcococcOOooCccooCoccOccoCcoCccOcccOoCCococCooOCoocccocoOocoOCCcoccOcOcccoOooooOOOoOcCcocCoCoOCOOcOcOOocooooocoCccocooocoooocccccooccccCCcoocococCcccCOcccccOoooOoooCcocccooocoCccOCCCccooccOwcCoccCcCcccocooOocCocccoOccocooccOocccooocooccOcccocoocoOOCOocOoococooOoOcocoocOcCcococcocCcoCoCOoOcoOOccoCcOoococoCooocccCooccCCcccCOooocoCOoOCcCccccocwcoCCOOcOoOccccCcocoCCococcCooOCcocccocOcocoocooooCoccccooOccCocoOOocococooOcccCocoOoccoCoocOccOoOOooooooocCoocCCcccococoooocCcoOooooOCcOccCooooOoocccccocoOocoCccCCcwOoOcocoocoOocccoOoCccocoocccccccooowccccOcCCoocooocOooococOOoooccoOwooOCccccoooocCooooooooooCwcooCcccoOcCoooOoOcwOoCoCcCocwoOOCcoocOOcCooocOoOooOoOccOcccocCoOcOcocoococcOoooccccccCoCooCcoooocCccOCccCooCcoOCcocoocOcoocoooOocCcCcoocoCOoOoocooCococoOccCoCoooocOoooOcoooCccocoocococOcOCccccoocccccccCooOoowoOcooOcCCOoCccCocooccoccoCCoccocOcccCo
    CCCOOCCOCOCOCOOCCCOOCOCOCOCOCCCOOCOOCOOWCOOOOOOOOOOCCOOCCCCCOCOCOOCOCOOOOOOOOOOOCCOCOOCCCCCOCOOCCCCOCOCCOOOOCCCOCOOCOOOOOOOCCCCOOCOOCOOOOOOCCOOOOCCCCCCCCOCCCCOOOOOCOCOCCOCCCCOCOCCCCCCCOOCCOCCOCCOOOCOOOOCOOOOOOCCOOCCOOCOCCCCOOOOOOOCOCOCCCCCCOOOCCOOCCCCCCOOCOOCCCCCOOCCCOCCCOCOOCOCCOCCOOOOOOOOOCCOOOCCOCOOOOOOOOCCCCOCOOCCOOOCOCCOOOOCOOOCCCWOOOCCOOCCOCCOCCOOCOCCCOCOOOOOCOOOCCCCCOCOCOOCOOWOOCCCOOOCCOOOCCOOCOOOOOOCOCCCOOCCCOOCOCOCOCCCCOCCCCOCCOOOOOCCOCCOOOOCOOCCCOOOCOOOOCCCOCOCCCOCCOOOCCOOCCCOOCCOCOOCC`
        , `1
      beFgH
    EFG
    beFgH
    EFH`,
        `1
    daBcd
    ABC`];

    for (let i = 0; i < 1; i++) {    //  inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const q = parseInt(lines[index++], 10);

        for (let qItr = 0; qItr < q; qItr++) {
            const a = lines[index++], b = lines[index++];

            let result = abbreviation(a, b);
            console.log(result);
        }
    }
}

function countTime(func) {
    let savedThis = this;
    return function (...args) {
        let start = new Date();
        let result = func.apply(savedThis, args);
        let end = new Date();
        console.log(`${((end - start) / 1000).toFixed(1)} seconds spent.`);
        return result;
    }
}