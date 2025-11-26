'use client';

import React from 'react';
import { token } from '@atlaskit/tokens';
import Lozenge from '@atlaskit/lozenge';
import Button from '@atlaskit/button/new';
import { IconButton } from '@atlaskit/button/new';
import CopyIcon from '@atlaskit/icon/core/copy';

interface WorkItem {
  key: string;
  summary: string;
  status: string;
  dueDate?: string;
  priority?: 'High' | 'Medium' | 'Low';
}

interface WorkItemsWidgetProps {
  data: {
    items: WorkItem[];
    assignedTo?: string;
  };
  onInsert?: () => void;
  showInsertMenu?: boolean;
  moreMenu?: React.ReactNode;
}

export default function WorkItemsWidget({ data, onInsert, showInsertMenu, moreMenu }: WorkItemsWidgetProps) {
  if (!data || !data.items || !Array.isArray(data.items)) {
    return (
      <div style={{ padding: '12px', color: token('color.text.danger') }}>
        Error: Invalid widget data
      </div>
    );
  }

  const getStatusAppearance = (status: string): 'default' | 'inprogress' | 'success' | 'removed' => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('progress') || lowerStatus.includes('review')) return 'inprogress';
    if (lowerStatus.includes('done') || lowerStatus.includes('complete')) return 'success';
    if (lowerStatus.includes('blocked')) return 'removed';
    return 'default';
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'High':
        return '#AE2A19';
      case 'Medium':
        return '#974F0C';
      case 'Low':
        return '#626F86';
      default:
        return token('color.text.subtle');
    }
  };

  return (
    <div
      style={{
        backgroundColor: token('elevation.surface'),
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0px 1px 1px 0px rgba(30, 31, 33, 0.25), 0px 0px 1px 0px rgba(30, 31, 33, 0.31)',
      }}
    >
      <div
        style={{
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${token('color.border')}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src="/Jira.svg"
            alt="Jira"
            style={{ width: 16, height: 16, objectFit: 'contain' }}
          />
          <div style={{ fontSize: '14px', fontWeight: 400, color: token('color.text') }}>
            {data.assignedTo ? `Work items assigned to ${data.assignedTo}` : 'Work Items'}
          </div>
        </div>
        {moreMenu}
      </div>

      {data.items.map((item, index) => (
        <div
          key={index}
          style={{
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: token('space.075'),
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            borderBottom: index < data.items.length - 1 ? `1px solid ${token('color.border')}` : 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = token('color.background.neutral.subtle.hovered');
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: token('space.100') }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: token('space.100'), marginBottom: '4px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: token('color.link'),
                    fontFamily: 'monospace',
                  }}
                >
                  {item.key}
                </span>
                {item.priority && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: getPriorityColor(item.priority),
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {item.priority}
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: token('color.text'),
                  lineHeight: '1.4',
                }}
              >
                {item.summary}
              </div>
            </div>
            <Lozenge appearance={getStatusAppearance(item.status)} isBold>
              {item.status}
            </Lozenge>
          </div>
          {item.dueDate && (
            <div
              style={{
                fontSize: '12px',
                color: token('color.text.subtlest'),
                display: 'flex',
                alignItems: 'center',
                gap: token('space.050'),
              }}
            >
              <span>Due:</span>
              <span style={{ fontWeight: 500 }}>{item.dueDate}</span>
            </div>
          )}
        </div>
      ))}

      {onInsert && (
        <>
          <div style={{ height: '16px', borderBottom: `1px solid ${token('color.border')}` }} />
          <div style={{ padding: '8px 12px 12px', display: 'flex', gap: token('space.100') }}>
            <Button appearance="default" onClick={onInsert}>
              Insert in page
            </Button>
            <IconButton icon={CopyIcon} label="Copy" appearance="subtle" />
          </div>
        </>
      )}
    </div>
  );
}
