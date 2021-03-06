'use strict'

countTime(main)();

function abbreviation(a, b) {

    function isAllLowerCase(str) {
        return str.toLowerCase() === str;
    }

    function isAllUpperCase(str) {
        return str.toUpperCase() === str;
    }

    let result = [], rowLen = a.length, columnLen = b.length;
    for (let i = 0; i <= rowLen; i++)
        result[i] = [];

    result[0][0] = true;
    // a is empty, but b is still not empty (j represents length of b)
    for (let j = 1; j <= columnLen; j++)
        result[0][j] = false;

    // b is empty but a is not empty  (i represents length of a)
    for (let i = 1; i <= rowLen; i++)
        result[i][0] = isAllLowerCase(a.slice(0, i));

    for (let i = 1; i <= rowLen; i++) {
        for (let j = 1; j <= columnLen; j++) {
            // Now, both a and b length is none-zero
            let aLast = a[i - 1], bLast = b[j - 1];

            if (aLast === bLast)
                result[i][j] = result[i - 1][j - 1];
            else if (aLast.toUpperCase() === bLast) {
                // aLast is lower case and its upper case match bLast
                // 1. aLast is part of the final transformed A  2. aLast is NOT part of the final transformed A
                result[i][j] = result[i - 1][j - 1] || result[i - 1][j];
            }
            else {
                // Now, aLast can't match bLast
                if (isAllUpperCase(aLast))      // And, aLast is upper case
                    result[i][j] = false;
                else                         // And, aLast is lower case
                    result[i][j] = result[i - 1][j];
            }
        }   // for (let j = 1; j <= bLen; j++)
    }       // for (let i = 1; i <= aLen; i++)

    for (let i = 1; i < result.length; i++) {
        let row = result[i], rowString = row.reduce((agg, cur, idx) => (idx > 0 ? agg + ' ' + (cur === true ? 1 : 0) : ''), '');
        console.log(rowString);
    }
    console.log();

    return result[rowLen][columnLen] ? 'YES' : 'NO';
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