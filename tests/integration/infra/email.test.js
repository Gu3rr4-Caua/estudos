import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "Caua <cauaguerra33@gmail.com>",
      to: "guerra.caua@yahoo.com.br",
      subject: "Meu primeiro email",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "Caua <cauaguerra33@gmail.com>",
      to: "guerra.caua@yahoo.com.br",
      subject: "Meu segundo email",
      text: "Teste de corpo.",
    });

    const lastEmail = await orchestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<cauaguerra33@gmail.com>");
    expect(lastEmail.recipients[0]).toBe("<guerra.caua@yahoo.com.br>");
    expect(lastEmail.subject).toBe("Meu segundo email");
    expect(lastEmail.text).toBe("Teste de corpo.\n");
  });
});
