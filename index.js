import ReactDOM from 'react-dom'
import React from 'react';
import App from './src/app';

let text = `
# Hello
I am using __markdown__.

## It is working fine

Yupp, I think so.

Det finns flera olika sökmotorer, som t.ex.
[Google](http://www.google.se) och
[Yahoo](http://www.yahoo.com "en sökmotor precis som Google").
Men det finns även andra typer av sökmotorer, t.ex. [Prisjakt](http://www.prisjakt.nu "företaget där jag jobber"), vars mål inte är att indexera hela internet utan bara en specifik del av internet.

[Dairy](/dairy/index)

---

### Todo

[x] lkjfdsl
[ ] fdaslk

- List 1
- List 2

\`let js = 'javascript';\`
`;

let text2 = `
# 2015-12-18

## Report #111700

Jag hade problem med att jag inte kunde se de engelska översättningarna (och ibland inte ens de svenska). Men Dan och Adam hjälpte mig och tydligen så går det egentligen inte att komma åt översättningar från andra länder eftersom de inte kompileras. Men om man ändrar i prisjakt/common.php så kan man få alla översättningar.

Ändra rad 142: \`I18n_Gettext_Compile_Auto::run();\`
Till rad 142: \`I18n_Gettext_Compile_Auto::run_sync();\`

Och sen kompileras alla po filer till mo filer, vilket tar ganska lång tid. Därför är det bäst att ändra tillbaka koden direkt efter. Om det istället blir en massa felmedelanden kan det lösas genom att först ta bort prisjakt/translations/locale/. Då måste precis allt kompileras om.

## Main tab

> christiannilsson [11:45] 
> Jag har kollat lite på redirect.php och den kollar butikstyp vilket verkar
> vara land ibland, eu ibland och sv ibland. Men den kollar inte market iaf så
> redirect fungerar ju.
>
> zahak [11:46] 
> :y:
>
> christiannilsson [11:47] 
> Jag har inte kollat så mycket på loggning av klicken. Men jag ser att
> market == primary används där.
>
> zahak [11:49] 
> Mm, det kanske vi borde se över.


## Testkod

\`\`\`php
// En kommentar
if (isset($_GET['as_user']) && $_GET['as_user'] !== 'self') {
  //Trying to view the page as another user. Is it allowed?
  if ((isset($ini_settings['dev_mode']) && $ini_settings['dev_mode']) || SITE_VERSION == 'i18n') {
    $userinfo = User_Util::get_user_by_name($_GET['as_user'])->get_array();
    User_EventLog::disable();
  }
}
\`\`\`


## Borttagningsorsak

Jag skrev i [ett tidigare inlägg](/diary/2015-12-14) om var \`company_credit_details\` används. Jag tänkte kolla om jag kan använda gettext där nu.

* \`admin/admin_modules/func_skapa_foretag.php\` används för att hämta data till skapa_foretag.php och dess tpl-fil.
* \`admin/agent/fail_status.php\` sätter company_credit_details_id till -1 ibland, men det borde ju inte göra något.
* \`admin/agent/kredit.php\` hämtar bara datan och skriver ut i en tabell, vet inte om jag måste ändra något.
* \`admin/agent/lspf.php\` hämtar och visar borttagningsorsak (FIXAT!). Listar alla borttagningsorsaker som finns för butikens land (FIXAT!).
* \`admin/classes/Admin/Agent/AgentPricesRepository.php\` hämtar kommentar med id från DB och skickar in i en annan metod (förstod inte vad den gör där). Jag ändrade så att den hämtar den engelska versionen av kommentaren. Vet inte om det är rätt, det hade kanske varit bättre att hämta den på samma språk, men jag hittar ingenstans där klassen används så jag vet inte hur den används. Eller det verkar vara för vTiger (vad det nu är). Den hämtar även alla olika kommentarer (fixat).
* \`admin/generic_query.php\` använder bara company_credit_details_id från foretag-tabellen.
* \`prisjakt/classes/Company/AdminInfoTexts.php\` använder datan i metoden get_store_skype_text. Som hämtas av metoden _fetch_company_info. Classen används av: \`admin/agent/fail_status.php\` (get_store_skype_text), \`admin/agent/lspf.php\` (get_store_skype_text), \`admin/classes/Admin/Agent/AgentPricesRepository.php\` (get_store_skype_text) och \`prisjakt/classes/Company/Store/Featured/Util.php\` (inget). Fixat!
* \`prisjakt/classes/Info/Store/Standard.php\` användes i _build_sql. Classen används av \`classes/Info/Store/Extended.php\` och \`classes/Search/Factory/Supersearch.php\`. Genom Info_Store_Extended används den även av \`classes/Search/Factory/SearchPage.php\`. Genom Search_Factory_Supersearch används den även i \`classes/Search/Supersearch.php\`. Supersearch är fixat och opensearch suggestions borde ju inte vara påverkat.
* \`prisjakt/modules/foretag.class.php\` är en populär fil och använder company_credit_details för att hämta ut kommentaren, men jag tror jag översätter direkt efter att datan har hämtats från databasen. Fixat!
* \`prisjakt/modules/foretag_plur.class.php\` vet inte var den används. La var_dump i koden som hämtar från db men får inte ut datan någonstans så funktionen används kanske inte. Den används i public_html/butiksinfo.php, men bara för att lista alla företag, och där visas inte borttagningsorsak eller ens borttagna affärer. Används även av admin/ajax/combobox_header_json.php, metoden search, men får ingen information om borttagningsorsak från klassen. Jag tror inte att master_templates/prisjakt/misc/skuldsaldo.php används längre så jag behöver antagligen inte ändra något där iheller, filerna borde antagligen tas bort. Det verkar inte som att informationen om borttagningsorsak används någonstans, så det känns ju lite onödigt att foretag_plur.php hämtar den.
* \`prisjakt/modules/super_search.php\` ja jag vet inte. Jag kan inte riktigt se var den används (i kod kan jag kanske se men jag kan inte se någon sida som använder den).

Jag har fortfarande inte kollat om det finns några mer än den ena filen som använder databasen men är inte i git. Jag försökte göra det men jag tyckte det gick så trögt. Men jag borde kanske göra det.

I select-fältet på skapa_foretag.php sätts två selected eftersom det är samma id på svenska och engelska. Men i Chrome fungerar det iaf väldigt bra, den väljer den sista som är selected (den engelska).

### TODO

* Jag borde kanske kolla vad kolumnen kredit_kommentar i tabellen foretag gör. Eller hur den sätt mer kanske.


## Malmöflytten

_31 dagar_ tills jag flyttar till Malmö.
`;

ReactDOM.render(
    <App markdown={text2} />,
    document.getElementById('anteckningar'));
