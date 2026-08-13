import re

with open('server.ts', 'r') as f:
    content = f.read()

content = content.replace('''      const result =
        await jumoConversationalReasoning.reason({
          message: message.trim(),
          mode,
          context,
        });''', '''      const reasoningRes = await JumoAIProviderGateway.getInstance().reasoning({
        message: message.trim()
      });
      const result = { response: reasoningRes.text };''')

with open('server.ts', 'w') as f:
    f.write(content)
