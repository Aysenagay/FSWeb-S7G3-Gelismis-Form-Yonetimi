///<reference types ="cypress"/>
const passingName = "Dobby";
const passingSurname = "DobbySur";
const passingEmail = "dobby@dobby.com";
const passingPassword = "1234567";
const failingPassword = "123a";
const failingEmail = "dobby@dobbycom";
describe("form yükleniyor", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("form elemanların hepsi ekranda", () => {
    cy.get("input").should("have.length", 5);
    cy.get("button[type=submit]").should("be.visible");
    cy.get("button[type=reset]").should("be.visible");
  });
  it("hatasız giriş yapınca,üye listesine ekleniyor", () => {
    cy.get("input[name=name]").type(passingName);
    cy.get("input[name=surname]").type(passingSurname);
    cy.get("input[name=email]").type(passingEmail);
    cy.get("input[name=password]").type(passingPassword);
    cy.get("input[name=terms]").click();
    cy.get('button[type="submit"]').should("not.be.disabled").click();
  });
  it("sadece isim boşken form gönderilmiyor", () => {
    cy.get("input[name=name]").type("isim");
    cy.get("input[name=name]").clear();
    cy.get("input[name=email]").type(passingEmail);
    cy.get("input[name=password]").type(passingPassword);
    cy.get("input[name=terms]").click();
    cy.get('button[type="submit"]').should("be.disabled");
  });
  it("hata mesajı görüntüleniyor", () => {
    cy.get("input[name=name]").type("isim");
    cy.get("input[name=name]").clear();
    cy.get("input[name=name]+div.field-error").should("be.visible");
    cy.get("input[name=name]+div.field-error").should(
      "have.text",
      "İsim 5 karakterden fazla olmalı."
    );
    cy.get('button[type="submit"]').should("be.disabled");
  });
  it("email yanlış girdiğinde", () => {
    cy.get("input[name=email]").type("failingEmail");
    cy.get("input[name=email]").click();
    cy.get("input[name=email]+div.field-error").should("be.visible");
  });
});
