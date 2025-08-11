// ==UserScript==
// @name         Always Remember Me
// @namespace    https://www.patabugen.co.uk/
// @version      2.5.8
// @description  Always tick "Remmeber Me" or "Keep me logged in" options when presented.
// @license MIT
// @author       Sami Walbury (n Greenbury)
// @match        http://*
// @match        https://*
// @include      http://*
// @include      https://*
// @run-at       document-idle
// @downloadURL  https://openuserjs.org/install/Patabugen/Always_Remember_Me.user.js
// @updateURL    https://openuserjs.org/meta/Patabugen/Always_Remember_Me.meta.js
// @copyright    2017-2025, Patabugen (https://openuserjs.org/users/Patabugen)
// @grant        none
// ==/UserScript==
/**
 * Changelog:
 * 2.5.8 2025-07-22 Added _remember_me (Thanks @fahad https://openuserjs.org/scripts/Patabugen/Always_Remember_Me/issues/add_site )
 * 2.5.7 2024-06-17 Added team_member_remember_me
 * 2.5.6 2023-01-23 Added C2__remember_my_email_0
 * 2.5.5 2022-10-31 Added remember_me_checkbox
 * 2.5.4 2022-10-31 Updated fastmail.com v18-input from v25
 * 2.5.3 2022-06-15 Added id_kep
 * 2.5.2 2022-05-25 Added rememberDetail
 * 2.5.1 2022-04-09 Fixed faulty @match (and included @include for compatibility)
 * 2.5 2022-04-09 Removed 'frmLogin:loginRemember' for now because it causes errors with google docs. Replaced @include with @match
 * 2.4.1 2022-03-07 Added 'remember-input'
 * 2.4 2021-12-10 Disabled debugmode (sorry for the console.log spam!)
 * 2.3 2021-12-03 Added CSS Selector support (And some new rules). Also updated @source URL
 * 2.2 2021-01-06 Added new rules
 * 2.1 2020-11-25 Fixed bug which stopped Class or IDs from being checked.
 * 2.0 2020-11-24 Merged the three lists is all listed names are checked for as class, ID or Name.
 * 1.* Initial Release. Various misc updates adding rules over time.
 **/
(function () {
  "use strict";

  // Set this to true if you want to output debug info about what the plugin
  // finds and does.
  var armDebug = false;

  function armLog(arg1, arg2) {
    if (!armDebug) {
      return;
    }
    console.log(arg1, arg2);
  }

  // Given an array of nodes, make sure they're all ticked. Does nothing if
  // the checkbox is already checked, if it's not checked will set it to
  // 'false' and then click on it so we trigger any click events which may
  // be registered.
  function check_all_checkboxes(checkBoxes) {
    armLog("Attempting to check", checkBoxes);

    if (checkBoxes === undefined || !checkBoxes || checkBoxes.length === 0) {
      // If the array is empty, there's nothing to do here.
      return;
    }
    for (var i = 0; i < checkBoxes.length; i++) {
      // If we're not even truthy, we have nothing to be doing here
      if (!checkBoxes[i]) {
        armLog("Skipping because this node is not truthy", checkBoxes[i]);
        continue;
      }

      // If we don't support click, this might not be a valid node.
      if (!checkBoxes[i].click) {
        armLog(
          "Skipping because this node does not support a click",
          checkBoxes[i],
        );
        continue;
      }

      // If we're already checked, don't do anything
      if (checkBoxes[i].checked) {
        armLog("Skipping because this node is already checked", checkBoxes[i]);
        continue;
      }
      armLog("Making this node be checked", checkBoxes[i]);
      checkBoxes[i].checked = false;
      checkBoxes[i].click();
    }
  }

  // To support more checkboxes add their name, ID or class to this list.
  var nodeNamesOrIds = [
    "remember",
    "rememberme",
    "rememberMe",
    "remember-me",
    "remember_me",
    "_remember_me",
    "sso_RememberMe",
    "user_session_remember_me",
    "rememberMe-true",
    "account_remember_me",
    "trusted_device",
    "trust_device",
    "v25-input",
    "v20-input",
    "remember_login-label",
    "keepMeLoggedIn",
    "rememberMeBox",
    "remember_me_checkbox",
    "v25-input",
    "v18-input",
    "v33-input",
    "session_form_trusted_device",
    ".auth-remember-me-panel input[type=checkbox]",
    "remember-input",
    "rememberDetail",
    "id_kep",
    "C2__remember_my_email_0",
    "team_member_remember_me",
  ];

  function check_all_remember_me_checkboxes() {
    for (var nameIndex = 0; nameIndex < nodeNamesOrIds.length; nameIndex++) {
      armLog("Looking up by name: " + nodeNamesOrIds[nameIndex]);
      check_all_checkboxes(
        document.getElementsByName(nodeNamesOrIds[nameIndex]),
      );
      armLog("Looking up by ID: " + nodeNamesOrIds[nameIndex]);
      check_all_checkboxes([
        document.getElementById(nodeNamesOrIds[nameIndex]),
      ]);
      armLog("Looking up by class: " + nodeNamesOrIds[nameIndex]);
      check_all_checkboxes(
        document.getElementsByClassName(nodeNamesOrIds[nameIndex]),
      );
      armLog("Looking up by selector: " + nodeNamesOrIds[nameIndex]);
      check_all_checkboxes(
        document.querySelectorAll(nodeNamesOrIds[nameIndex]),
      );
    }
  }

  // We already run when the document is totally ready (see @run-at above) but
  // some sites need another moment to get ready (specifically FastMail.com at the
  // time of writing. A half-second delay shouldn't affect our users experience.
  setTimeout(check_all_remember_me_checkboxes, 500);
})();
