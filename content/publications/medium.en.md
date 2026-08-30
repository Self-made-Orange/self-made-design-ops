# A Design Starting Point for Small Teams Building With AI

Why I built Self-Made DesignOps for early-stage builders, designers, and startups that need something practical to build on.

When I think about who I am building this for, I picture someone trying to get a first product into people's hands. A solo builder making both product and interface decisions. A designer working across an entire experience. A small startup team that needs to ship, learn, and keep improving. They may have different skills, but they all have decisions competing for their attention. What needs to go into the first version? Which flow needs another pass? How should the interface behave when something goes wrong? Choosing a button height or documenting an input style still matters. I wanted those decisions to have a useful starting point, without requiring the team to create a complete design system first.

I liked [awesome-design-md](https://github.com/VoltAgent/awesome-design-md). Having design references ready to share with an AI assistant felt useful. But for the decisions I wanted to make, I felt more comfortable when I could trace the guidance back to actual data. I wanted to look beyond any one design system and understand the broader picture: what typical values look like across systems, where they cluster, and where they differ. I needed an aggregate view to help me choose a starting point with more confidence. That did not mean averaging every number into one universal answer. A touch interface and a dense desktop screen need different things. I wanted the averages and distributions to be considered alongside those conditions, so I could see which comparisons were useful for the product in front of me.

That is why I built **Self-Made DesignOps**: a collection of design references, reusable rules, and tools that people can use directly—and bring into their work with AI. The project starts from a simple intention. Help people spend less effort gathering the same background information, so they have more room to think about their own product. That is what I am trying to support, rather than a result I can promise for every team. You can [explore the website here](https://self-made-orange.github.io/self-made-design-ops/?lang=en). There is no need to adopt the entire repository to get something from it. Start with a screen you are already designing and look up one thing you need to decide.

The collection currently covers 116 design systems, with comparisons of nine types of UI elements. You can browse a system you know, or go straight to buttons, typography, forms, motion, and other parts of an interface. For a designer, that can provide references for a decision they need to explain. For a builder, it can offer a starting value and the context around it. For a small team, it can become something everyone can refer back to as the product changes.

The context matters. The button comparison draws on measurements from 77 systems. Its current synthesis identifies 40px as the most common default height, but not a majority choice. It is a possible starting point for desktop web, with the density of the interface still left for you to consider. I want that qualification to travel with the number. A compact admin screen and a touch interface have different needs. A value used elsewhere still needs to be checked in your product, including for usability and accessibility.

That is also why I made the project AI-friendly. If you are already using an AI coding assistant, you should be able to give it the same references you are using. The reasoning behind your interface should be available alongside the request to build it. In this project, “AI-friendly” means concrete things. The guides are Markdown files an assistant can read. Structured data is available as JSON. There are four task guides covering reference selection, design review, analytics events, and localization. Each gives the assistant a process to follow and material to consult.

The kit also generates a `DESIGN.md`: a file describing the starting design decisions for a project. You can review it, adapt it, and point your coding assistant to it through the rules file your tool uses. Nothing is connected automatically. You still need to make the files available to your assistant and tell it when to use them. I wanted the setup to work through ordinary files, with instructions you can read and change yourself.

For example, imagine you are building the first version of an admin interface. You could ask:

> Read this project's DESIGN.md and the form and button comparisons in Self-Made DesignOps. Propose starting sizes for this screen, explain the sources, and flag anything that still needs a decision from me.

Now there is something concrete to review together. You can inspect the proposed sizes, question an assumption, or choose a different direction. Once you agree, keep the project's decisions in its own files so the next task has that context too.

I have also tried to make uncertainty visible. The generated guide distinguishes measured values, values derived from measurements, author decisions, and things that have not been verified. In the measured profiles, the brand palette stays open for you to choose. That leaves room for a designer's judgment and a startup's identity. The reference material can help you work through sizes, spacing, and behavior; the product still needs your choices.

If you want to try the generator, you need Git and Node, with no additional packages:

```bash
git clone --depth 1 https://github.com/Self-made-Orange/self-made-design-ops .design-ops
node .design-ops/design-systems/to-design-md.mjs --profile web --name "My product" -o DESIGN.md
```

Run this somewhere you do not already have a `DESIGN.md`, because it writes that file in the current directory. Read the output before using it as an implementation guide.

If your work starts in a design tool, you can simply browse the comparisons instead. Pick one question from the screen in front of you, read the sources, and keep the parts that help. You can bring the AI workflow in whenever it becomes useful.

The collection has limits. It leans toward web, coverage differs by system, and values reflect the versions recorded in the documents. The total of 116 systems is not the sample count for every comparison. Unconfirmed information stays marked, so neither you nor your assistant should treat it as settled.

I made this for people getting something off the ground: the builder who is also making design decisions, the designer helping a small team move, and the startup finding its first product shape. My hope is that they can begin with a few useful references, make choices they understand, and give their AI assistant enough context to help carry those choices into the work. A starting point they can use today and change as they learn.

I also ran an AI rubric evaluation across five criteria. I want to share that result alongside the project, while keeping it separate from evidence about how well the kit works for real users.

> **Editorial note — complete before publishing:** Insert the original five criterion names, their scores and maximum scores, and the reported overall result here. The earlier evaluation has not been recovered yet; no score has been estimated or replaced with a new evaluation.

[Explore Self-Made DesignOps](https://self-made-orange.github.io/self-made-design-ops/?lang=en) · [Browse the design systems](https://self-made-orange.github.io/self-made-design-ops/catalog.html?lang=en) · [Get the repository](https://github.com/Self-made-Orange/self-made-design-ops)
