import React, { Fragment } from "react";
import { Group } from "@vx/group";
import { NodeGroup } from "react-move";
import Link from "./Link";
import { findCollapsedParent } from "./utils";

function Links({ links, linkType, layout, orientation, stepPercent }) {
  return (
    <NodeGroup
      data={links}
      keyAccessor={(d, i) => `${d.source.data.name}_${d.target.data.name}`}
      start={({ source, target }) => {
        return {
          source: {
            x: source.data.x0,
            y: source.data.y0
          },
          target: {
            x: source.data.x0,
            y: source.data.y0
          }
        };
      }}
      enter={({ source, target }) => {
        return {
          source: {
            x: [source.x],
            y: [source.y]
          },
          target: {
            x: [target.x],
            y: [target.y]
          }
        };
      }}
      update={({ source, target }) => {
        return {
          source: {
            x: [source.x],
            y: [source.y]
          },
          target: {
            x: [target.x],
            y: [target.y]
          }
        };
      }}
      leave={({ source, target }) => {
        const collapsedParent = findCollapsedParent(source);
        return {
          source: {
            x: [collapsedParent.data.x0],
            y: [collapsedParent.data.y0]
          },
          target: {
            x: [collapsedParent.data.x0],
            y: [collapsedParent.data.y0]
          }
        };
      }}
    >
      {nodes => (
        <Group>
          {nodes.map(({ key, data, state }) => {
            return (
              <Link
                data={state}
                linkType={linkType}
                layout={layout}
                orientation={orientation}
                stepPercent={stepPercent}
                stroke="#AEEEEE"
                strokeWidth="1"
                fill="none"
                key={key}
              />
            );
          })}
        </Group>
      )}
    </NodeGroup>
  );
}

export default Links;
