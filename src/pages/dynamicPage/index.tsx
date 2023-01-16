import { useState } from "react";
import MaterialJsonSchemaForm from "react-jsonschema-form-material-ui";
import schema from "../schema/schema.json";
import uiSchema from "../schema/ui-schema.json";
import givenFormData from "../schema/form-data.json";
import { useRouter } from "next/router";

const theme = {
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
};

export default () => {
  const [formData, setFormData] = useState(givenFormData);
  const [error, setError] = useState("");
  const [blog, setBlog] = useState("");
  const router = useRouter();
  const onSubmit = (value, callback) => {
    //console.log('onSubmit: %s', JSON.stringify(value.formData)); // eslint-disable-line no-console
    //setTimeout(() => callback && callback(), 2000);

    const result = fetch(`api/template/1`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "asid-services-app": `cd05f2b8-b222-4068-a78d-749fffeced76`,
      },
      body: JSON.stringify(value.formData),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else setError("uanble to load template");
      })
      .then(function (result) {
        console.log("cookie" + result);
        //                                 router.push({
        //                                     pathname: "/preview",
        //                                     query: { htmlContent: result?.htmlData },
        //                                 });
        setBlog(result?.htmlData);
      });
    // just an example in real world can be your XHR call
  };
  function createMarkup(c) {
    return { __html: c };
  }
  return (
    <>
      {!blog && (
        <MaterialJsonSchemaForm
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          theme={theme} // Optional
          onChange={({ formData }) => setFormData(formData)}
          onSubmit={onSubmit}
        />
      )}
      {blog && <div dangerouslySetInnerHTML={createMarkup(blog)}></div>}
    </>
  );
};
