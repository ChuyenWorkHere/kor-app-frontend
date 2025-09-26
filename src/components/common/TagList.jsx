import React, { useEffect, useState } from "react";
import api from "../../config/axiosConfig";

const TagList = () => {
  const [tags, setTags] = useState([{ tagId: 0, tagName: "Tất cả" }]);
  const [currentTag, setCurrentTag] = useState(0);

  useEffect(() => {
    api
      .get("/public/tags")
      .then((response) => {
        setTags([{ tagId: 0, tagName: "Tất cả" }, ...response.data.data]);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }, []);

  return (
    <div className="position-relative mb-4">
      <div className="d-flex gap-2 overflow-auto pb-2">
        {tags.map((tag, index) => (
          <button
            onClick={() => setCurrentTag(tag.tagId || 0)}
            key={tag.tagId}
            className={`btn btn-sm rounded-pill flex-shrink-0 ${
              index === currentTag
                ? "text-white"
                : "btn-outline-secondary bg-white text-secondary"
            }`}
            style={
              index === currentTag
                ? { backgroundColor: "rgb(95, 46, 234)", border: "none" }
                : {}
            }
          >
            {tag.tagName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagList;
