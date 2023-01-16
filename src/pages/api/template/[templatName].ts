const handlebars = require("handlebars");
const fs = require("fs");
const util = require("util");
const { resolve, join } = require("path");
const readFile = util.promisify(fs.readFile);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return processTemplate(req, res);
    default:
      return res.status(501).end();
  }
}
async function processTemplate(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  //console.log(data);
  try {
    // template is placed in the `templates` dir
    const templateDir = resolve(process.cwd(), "src", "template");

    const templateFile = join(templateDir, "LSCS_T1.hbs");
    let source = await readFile(templateFile, "utf8");
    source = handlebars.compile(source);
    // params are being passed here
    const finalHTML = source(data);
    //res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // res.write(finalHTML);
    // res.end();
    return res.status(200).json({ htmlData: finalHTML });
  } catch (error) {
    return res.status(500).end();
  }
}
