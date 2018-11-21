import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import Context from '../../context';
import styleName from '../../utils/styleName';
import FormString from '../FormString/FormString';
import FormNumber from '../FormNumber/FormNumber';

/**
 * 当类型为object时的组件渲染
 * json schema的属性包括：$id、type、title、description、properties、required
 */
class FormObject extends Component{
  static contextType: Object = Context;
  static propTypes: Object = {
    root: PropTypes.object
  };

  // 根据type渲染不同的组件
  renderComponentByTypeView(root: Object, required: boolean): ?React.Element{
    const { $id, type }: {
      $id: string,
      type: string
    } = root;

    switch(type){
      case 'string':
        return <FormString key={ $id } root={ root } required={ required } />;
      case 'integer':
      case 'number':
        return <FormNumber key={ $id } root={ root } required={ required } />;
      case 'boolean':
        return 'boolean';
      case 'array':
        return 'array';
      case 'object':
        return this.renderObjectComponentView(root);
      default:
        return null;
    }
  }
  // 渲染一个object组件
  renderObjectComponentView(root: Object): React.Element{
    const { $id, title, description }: {
      $id: string,
      title: string,
      description: string
    } = root;
    const required: Array<string> = root?.required || [];
    const properties: ?Object = root?.properties || {};
    const element: React.ChildrenArray<React.Element> = [];

    // 判断object下组件的类型并渲染
    for(const key: string in properties){
      element.push(this.renderComponentByTypeView(properties[key], required.includes(key)));
    }

    return (
      <Collapse key={ $id } className={ styleName('object-collapse') } defaultActiveKey={ [$id] }>
        <Collapse.Panel key={ $id }
          header={[
            <b key="title">{ title || $id }</b>,
            <span className={ styleName('object-description') } key="description">{ description }</span>
          ]}
        >
          { element }
        </Collapse.Panel>
      </Collapse>
    );
  }
  render(): React.Element{
    const { root }: { root: Object } = this.props;

    return this.renderObjectComponentView(root);
  }
}

export default FormObject;