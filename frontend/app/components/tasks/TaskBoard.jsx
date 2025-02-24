'use client'
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import api from '../../lib/api';

const TASK_STATUS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done'
};

export const TaskBoard = ({ projectId }) => {
  const [tasks, setTasks] = useState({
    'To Do': [],
    'In Progress': [],
    'Done': []
  });

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/projects/${projectId}/tasks`);
      const groupedTasks = response.data.reduce((acc, task) => {
        acc[task.status].push(task);
        return acc;
      }, {
        'To Do': [],
        'In Progress': [],
        'Done': []
      });
      setTasks(groupedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const taskToMove = sourceColumn[source.index];

    // Update local state
    const newTasks = { ...tasks };
    newTasks[source.droppableId] = sourceColumn.filter(
      task => task._id !== taskToMove._id
    );
    newTasks[destination.droppableId] = [
      ...destColumn.slice(0, destination.index),
      taskToMove,
      ...destColumn.slice(destination.index)
    ];
    setTasks(newTasks);

    // Update backend
    try {
      await api.patch(`/tasks/${taskToMove._id}`, {
        status: destination.droppableId
      });
    } catch (error) {
      console.error('Error updating task status:', error);
      // Revert the state if the API call fails
      setTasks(tasks);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-4">
        {Object.keys(TASK_STATUS).map(status => (
          <div key={status} className="min-w-[300px] bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">{TASK_STATUS[status]}</h3>
            <Droppable droppableId={TASK_STATUS[status]}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-2"
                >
                  {tasks[TASK_STATUS[status]].map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-4 rounded shadow"
                        >
                          <h4 className="font-semibold">{task.title}</h4>
                          <p className="text-sm text-gray-600">
                            {task.description}
                          </p>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              Due: {new Date(task.deadline).toLocaleDateString()}
                            </span>
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              {task.assignee?.name.charAt(0)}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};